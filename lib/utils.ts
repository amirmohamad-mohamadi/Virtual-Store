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

// Format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  // Check if the error is a Zod validation error => signUpFormSchema => lib\validator.ts
  if (error.name === "ZodError") {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const message = error.errors[field].message;
      return typeof message === "string" ? message : JSON.stringify(message);
    });

    return fieldErrors.join(". ");
  }
  // Check if the error is a Prisma unique constraint error => prisma from db
  // uniq email in db
  else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Get the field name that caused the uniqueness violation
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    // Return a user-friendly message like "Email already exists"
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
