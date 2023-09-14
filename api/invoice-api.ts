import { APIRequestContext } from "@playwright/test";
import { API_BASE_URL } from "../utils/get-config.utils";
import ProductsApi from "./product-api.api";
import AuthAPI from "./auth-api.api";
import { createInvoiceData } from "../utils/create-invoice.utils";

class InvoiceApi {
  apiBaseUrl: string = API_BASE_URL;
  productsApi: ProductsApi;
  authApi: AuthAPI;
  constructor(public request: APIRequestContext) {
    this.productsApi = new ProductsApi(request);
    this.authApi = new AuthAPI(request);
  }

  async createInvoice(token) {
    const {
      id: userId,
      city,
      country,
      postcode,
    } = await this.authApi.getUserInfo(token);

    const res = await this.productsApi.getSingleProduct(1);
    const res2 = await this.productsApi.getSingleProduct(2);
    const { id: product_id1, price: unit_price1 } = await res.json();
    const { id: product_id2, price: unit_price2 } = await res2.json();

    const product1 = {
      product_id: product_id1,
      unit_price: unit_price1,
      quantity: 1,
    };
    const product2 = {
      product_id: product_id2,
      unit_price: unit_price2,
      quantity: 1,
    };
    const products = [product1, product2];
    const invoiceData = createInvoiceData(
      products,
      userId,
      city,
      country,
      postcode
    );

    return this.request.post(`${this.apiBaseUrl}/invoices`, {
      data: invoiceData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getInvoicesList(token) {
    return this.request.get(`${this.apiBaseUrl}/invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default InvoiceApi;
