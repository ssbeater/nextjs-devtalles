import Image from "next/image";
import Link from "next/link";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-10 col-r">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Change items</span>
            <Link href="/" className="underline mb-5">
              Edit cart
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                  style={{ width: "100", height: "100" }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal{product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl font-bold mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">Gridman Gerardo</p>
              <p>742 Evergreen Terrace</p>
              <p>Alcaldia Cuauhtémoc</p>
              <p>Ciudad de México</p>
              <p>CP 1231223</p>
              <p>123.123.123</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Summary</h2>

            <div className="grid grid-cols-2">
              <span>Quantity</span>
              <span className="text-right">3 items</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>Taxes</span>
              <span className="text-right">15</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">$115</span>
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
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Create Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
