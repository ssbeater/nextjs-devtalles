"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function paypalCheckPayment(paypalTransactionId: string) {
  const authToken = await getPayPalBearerToken();

  console.log({ authToken });

  if (!authToken)
    return { ok: false, message: "Failed to get PayPal bearer token" };

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!resp) return { ok: false, message: "Failed to verify PayPal payment" };

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];

  console.log({ status, orderId });

  if (status !== "COMPLETED")
    return { ok: false, message: "Payment not completed" };

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${orderId}`);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "500 - Payment not registered" };
  }
}

async function getPayPalBearerToken(): Promise<string | null> {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());

    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function verifyPayPalPayment(
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
