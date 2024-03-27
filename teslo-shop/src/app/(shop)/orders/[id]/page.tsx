import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
  initialData.products[5],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderByIdPage({ params }: Props) {
  const { id } = params;

  // todo - Validate
  // redirect("/")

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-10 col-r">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": true,
                  "bg-green-700": false,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pending for pay</span>
            </div>

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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": true,
                    "bg-green-700": false,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">Pending for pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
