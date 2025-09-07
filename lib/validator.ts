import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

// Make sure price is formatted with two decimal places
// ? ^: Anchors the regex to the start of the string
// ? \d+: Matches one or more digits (e.g., 49 in 49.99)
// ? (\.\d{2})?: Optionally matches a decimal point followed by exactly two digits (e.g., .99)
// ? ?: Makes the entire decimal part optional — it's valid even if there's no .99
// ? $: Anchors the regex to the end of the string

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places (e.g., 49.99)"
  );

// Schema for inserting a product
//NOTE: z.coerce.number() converts values to numbers (e.g., “10” -> 10) because the stock field in the database expects a numeric type.
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
