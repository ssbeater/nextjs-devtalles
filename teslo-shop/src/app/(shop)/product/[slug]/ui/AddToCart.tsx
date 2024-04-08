"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export function AddToCart({ product }: Props) {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const add = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setSize(undefined);
    setQuantity(1);
    setPosted(false);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">Should select a size</span>
      )}

      {/* Size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button className="btn-primary my-5" onClick={add}>
        Add to cart
      </button>
    </>
  );
}
