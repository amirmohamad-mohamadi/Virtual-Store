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
