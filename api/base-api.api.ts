import { APIRequestContext } from "@playwright/test";
import AuthAPI from "./auth-api.api";
import ProductsApi from "./product-api.api";
import InvoiceApi from "./invoice-api";

class BaseAPI {
  auth: AuthAPI;
  productsApi: ProductsApi;
  invoiceApi: InvoiceApi;

  constructor(public request: APIRequestContext) {
    this.auth = new AuthAPI(request);
    this.productsApi = new ProductsApi(request);
    this.invoiceApi = new InvoiceApi(request);
  }
}
export default BaseAPI;
