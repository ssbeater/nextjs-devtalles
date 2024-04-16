import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { Title } from "@/components";
import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utils";
import { OrderSummary } from "../../cart/ui/OrderSummary";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    notFound();
  }

  const { OrderAddress, OrderItem } = order!;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-10 col-r">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">
                {order!.isPaid ? "Paid" : "Pending for pay"}
              </span>
            </div>

            {/* Items */}
            {OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded"
                  style={{ width: "100", height: "100" }}
                />
                <div>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="hover:text-blue-500 fade-in"
                  >
                    {item.product.title} ({item.size})
                  </Link>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl font-bold mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">
                {OrderAddress?.firstName} {OrderAddress?.lastName}
              </p>
              <p>{OrderAddress?.address}</p>
              <p>
                {OrderAddress?.city}, {OrderAddress?.countryId}
              </p>
              <p>{OrderAddress?.postalCode}</p>
              <p>{OrderAddress?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Summary</h2>

            <div className="grid grid-cols-2">
              <span>Quantity</span>
              <span className="text-right">{order!.itemsInOrder} items</span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>
              <span>Taxes</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order!.isPaid,
                    "bg-green-700": order!.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">
                  {order!.isPaid ? "Paid" : "Pending for pay"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
