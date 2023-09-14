import { email, number, object, string, union } from "valibot";

export const signUpResponseModel = object({
  last_name: string(),
  dob: string(),
  address: string(),
  city: string(),
  state: string(),
  country: string(),
  postcode: union([number(), string()]),
  phone: number(),
  email: string([email()]),
  id: string(),
});
