import { array, object, string, number, boolean } from "valibot";
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  stock: z.number(),
  price: z.number(),
  is_location_offer: z.number(),
  is_rental: z.number(),
  brand_id: z.string(),
  category_id: z.string(),
  product_image_id: z.string(),
  product_image: z.object({
    id: z.string(),
    by_name: z.string(),
    by_url: z.string(),
    source_name: z.string(),
    source_url: z.string(),
    file_name: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    parent_id: z.string(),
  }),
  brand: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
});

export const ProductsSchema = z.array(ProductSchema);
