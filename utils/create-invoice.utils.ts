interface ProductInvoiceInterface {
  product_id: string;
  unit_price: number;
  quantity: number;
}

export const createInvoiceData = (
  products: ProductInvoiceInterface[],
  userId: string,
  city: string,
  country: string,
  postcode: string
) => ({
  billing_address: "Some address",
  billing_city: city,
  billing_country: country,
  billing_postcode: postcode,
  billing_state: "State",
  invoice_items: products,
  payment_account_name: "My payment account",
  payment_account_number: "1234567890",
  payment_method: "Bank Transfer",
  user_id: userId,
  total: Number(
    products
      .reduce((acc, item) => acc + item.quantity * item.unit_price, 0)
      .toFixed(2)
  ),
});
