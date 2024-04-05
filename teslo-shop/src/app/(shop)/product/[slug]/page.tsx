export const revalidate = 60480;

import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { Metadata } from "next";
import { Product } from '../../../../interfaces/product.interface';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "",
    openGraph: {
      images: [`/products/${product?.images[2]}`]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 mx-0 md:mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1000px]">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/* Desktop slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Size selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Quantity selector */}
        <QuantitySelector quantity={3} />

        {/* Button */}
        <button className="btn-primary my-5">Add to cart</button>

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
