"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get the latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  // SQLCode => SELECT * FROM "Product" ORDER BY "createdAt" DESC LIMIT LATEST_PRODUCTS_LIMIT;
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}
