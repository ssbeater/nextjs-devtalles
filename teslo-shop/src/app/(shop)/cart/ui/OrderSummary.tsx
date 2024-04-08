"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "../../../../utils/currencyFormat";

export const OrderSummary = () => {
  const { quantity, subtotal, taxes, total } = useCartStore((state) =>
    state.getSumaryInformation()
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>Quantity</span>
      <span className="text-right">{quantity} items</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>

      <span>Taxes</span>
      <span className="text-right">{currencyFormat(taxes)}</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
    </div>
  );
};
