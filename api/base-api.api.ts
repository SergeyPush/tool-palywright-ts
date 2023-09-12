import { APIRequest, APIRequestContext, request } from "@playwright/test";
import { API_BASE_URL } from "../utils/get-config.utils";
import AuthAPI from "./auth-api.api";
import ProductsApi from "./product-api.api";

class BaseAPI {
  // apiBaseUrl: string = API_BASE_URL;
  // api: APIRequestContext;
  auth: AuthAPI;
  productsApi: ProductsApi;

  constructor(public request: APIRequestContext) {
    this.auth = new AuthAPI(request);
    this.productsApi = new ProductsApi(request);
  }
}
export default BaseAPI;
