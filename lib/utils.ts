import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// NOTE: Before we do any fetching with Prisma, I want to create a simple utility function that will convert the Prisma result to a plain JavaScript object.
// Prisma returns a Prisma.Product object, but this object is tightly coupled to Prisma's internal data structures.
// We can create a simple utility function that will convert the Prisma result to a plain JavaScript object.

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
// ? padEnd ensures the decimal part has at least 2 digits by padding with "0" if needed decimal.padEnd(2, "0");
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
