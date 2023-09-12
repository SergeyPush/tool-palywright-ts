import { array, object, string, number, boolean } from "valibot";

export const ProductSchema = object({
  id: string(),
  name: string(),
  description: string(),
  stock: number(),
  price: number(),
  is_location_offer: number(),
  is_rental: number(),
  brand_id: string(),
  category_id: string(),
  product_image_id: string(),
  product_image: object({
    id: string(),
    by_name: string(),
    by_url: string(),
    source_name: string(),
    source_url: string(),
    file_name: string(),
  }),
  category: object({
    id: string(),
    name: string(),
    slug: string(),
    parent_id: string(),
  }),
  brand: object({
    id: string(),
    name: string(),
    slug: string(),
  }),
});

export const ProductsSchema = array(ProductSchema);
