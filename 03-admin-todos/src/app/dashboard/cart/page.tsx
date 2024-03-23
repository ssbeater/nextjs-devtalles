import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";

export const metadata = {
  title: "Shopping Cart",
  description: "Shopping Cart Page",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  console.log(cart);
  for (const id of Object.keys(cart)) {
    console.log(id);
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }
  console.log(productsInCart);
  return productsInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value || "{}");
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <div>
      <h1 className="text-5xl">Cart Product</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total to pay">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                $ {(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15%: $ {(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
