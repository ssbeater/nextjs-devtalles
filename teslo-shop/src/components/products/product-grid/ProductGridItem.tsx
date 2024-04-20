"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  product: Product;
}

export function ProductGridItem({ product }: Props) {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const changeToFirstImage = () => setDisplayImage(product.images[0]);
  const changeToSecondImage = () =>
    setDisplayImage(product.images[1] ?? product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link
        href={`/product/${product.slug}`}
        onMouseEnter={changeToSecondImage}
        onMouseLeave={changeToFirstImage}
      >
        <ProductImage
          src={displayImage}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600 transition-all"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
}
