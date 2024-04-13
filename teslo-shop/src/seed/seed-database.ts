import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

async function main() {
  // 0. Erease previous data
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { products, categories, users } = initialData;

  // 1. Create users
  await prisma.user.createMany({
    data: users,
  });

  // 2. Create categories
  const categoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  // 2.1. Get categories map from DB
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // 3. Create products
  await Promise.all(
    products.map(async (product) => {
      const { images, type, ...rest } = product;
      const dbProduct = await prisma.product.create({
        data: { ...rest, categoryId: categoriesMap[type] },
      });

      // 3.1. Create product images
      const imagesData = images.map((url) => ({
        url,
        productId: dbProduct.id,
      }));

      await prisma.productImage.createMany({
        data: imagesData,
      });
    })
  );

  // 4. Create countries
  await prisma.country.createMany({
    data: countries,
  });

  // Finish process
  console.log("Seed database...");
}

(() => {
  if (process.env.NODE_ENV !== "development") return;
  main();
})();
