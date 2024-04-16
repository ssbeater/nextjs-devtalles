"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export function PlaceOrder() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { quantity, subtotal, taxes, total } = useCartStore((state) =>
    state.getSumaryInformation()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // useEffect(() => {
  //   if (quantity <= 0) {
  //     router.replace("/cart");
  //   }
  // }, [quantity, router]);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    //* All ok
    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) return <p>Loading ...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl font-bold mb-2">Delivery Address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Summary</h2>

      <div className="grid grid-cols-2">
        <span>Quantity</span>
        <span className="text-right">{quantity} items</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Taxes</span>
        <span className="text-right">{currencyFormat(taxes)}</span>

        <span className="text-2xl mt-5">Total</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            By clicking on {'"'}Create Order{'"'} you agree to our{" "}
            <a href="#" className="underline">
              terms and conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              privacity policy
            </a>
            .
          </span>
        </p>

        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx("flex justify-center", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Create Order
        </button>
      </div>
    </div>
  );
}
