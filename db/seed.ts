import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  // SQLCode => DELETE FROM "Product";
  await prisma.product.deleteMany();

  // SQLCode => INSERT INTO "Product" ("name", "price", "stock", ...) VALUES  ('Phone', 499.99, 10, ...), ('Laptop', 999.99, 5, ...),...;
  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database seeded successfully");
}

main();
