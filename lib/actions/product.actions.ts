"use server";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get the latest products
export async function getLatestProducts() {
  // SQLCode => SELECT * FROM "Product" ORDER BY "createdAt" DESC LIMIT LATEST_PRODUCTS_LIMIT;
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}
