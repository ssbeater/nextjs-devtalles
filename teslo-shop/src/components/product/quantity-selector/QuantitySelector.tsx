"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onQuantityChanged }: Props) {

  const onChangeQuantity = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex">
      <button title="Remove" onClick={() => onChangeQuantity(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button title="Add" onClick={() => onChangeQuantity(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  );
}
