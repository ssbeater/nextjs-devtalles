export const revalidate = 60;

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const take = searchParams.take ? Number(searchParams.take) : 12;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Shop" subtitle="All products" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
