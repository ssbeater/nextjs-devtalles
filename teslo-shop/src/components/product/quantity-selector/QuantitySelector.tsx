"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export function QuantitySelector({ quantity }: Props) {
  const [count, setCount] = useState(quantity);

  const onChangeQuantity = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };

  return (
    <div className="flex">
      <button title="Remove" onClick={() => onChangeQuantity(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
      </span>
      <button title="Add" onClick={() => onChangeQuantity(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  );
}
