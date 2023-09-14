import { number, object, string, union } from "valibot";

export const InvoiceResponseModel = object({
  user_id: string(),
  billing_address: string(),
  billing_city: string(),
  billing_state: string(),
  billing_country: string(),
  billing_postcode: union([number(), string()]),
  total: number(),
  payment_method: string(),
  payment_account_name: string(),
  payment_account_number: number(),
  invoice_date: string(),
  invoice_number: string(),
  id: string(),
});
