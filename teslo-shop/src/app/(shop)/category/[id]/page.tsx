import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { Categories } from "@/interfaces";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;

const labels: Record<Categories, { title: string; subtitle: string }> = {
  men: { title: "For he", subtitle: "Mens products" },
  women: { title: "For she", subtitle: "Womens products" },
  kid: { title: "For they", subtitle: "Kids products" },
  unisex: { title: "For both", subtitle: "Unisex products" },
};

interface Props {
  params: {
    id: Categories;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (!labels[id]) {
    notFound();
  }

  const filteredProducts = seedProducts.filter(
    (product) => product.gender === id
  );

  return (
    <div>
      <Title title={labels[id].title} subtitle={labels[id].subtitle} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
