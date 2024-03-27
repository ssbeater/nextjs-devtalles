import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

export function SizeSelector({ selectedSize, availableSizes }: Props) {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available Sizes</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            type="button"
            className={clsx("mx-2 hover:underline text-lg font-bold", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
