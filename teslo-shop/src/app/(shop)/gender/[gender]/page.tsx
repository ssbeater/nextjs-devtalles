export const revalidate = 60;

import { notFound, redirect } from "next/navigation";
import { Gender } from "@prisma/client";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

const labels: Record<Gender, string> = {
  men: "For he",
  women: "For she",
  kid: "For they",
  unisex: "For both",
};

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const take = searchParams.take ? Number(searchParams.take) : 12;

  if (!labels[gender]) {
    notFound();
  }

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
    gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <div>
      <Title title={labels[gender]} subtitle={`${gender} products`} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
