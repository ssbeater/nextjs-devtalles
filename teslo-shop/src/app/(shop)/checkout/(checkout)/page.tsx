import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-64 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-10 col-r">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Change items</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout Summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
