import { APIRequestContext, APIResponse } from "@playwright/test";
import { API_BASE_URL } from "../utils/get-config.utils";

class ProductsApi {
  apiBaseUrl: string = API_BASE_URL;
  res: APIResponse;

  constructor(public request: APIRequestContext) {}

  async getData(res: APIResponse) {
    const { data } = await res.json();
    return data;
  }

  async getProductList() {
    return await this.request.get(`${this.apiBaseUrl}/products`);
  }

  async getProductListWithPriceRange(min: number, max: number) {
    return await this.request.get(
      `${this.apiBaseUrl}/products?between=price,${min},${max}`
    );
  }

  async getSingleProduct(id: number) {
    const products = await this.getProductList();
    const data = await this.getData(products);

    const singleProductId = data[id].id;

    const product = await this.request.get(
      `${this.apiBaseUrl}/products/${singleProductId}`
    );
    return product;
  }

  async getRelatedProducts(productId: number) {
    const singleProduct = await this.getSingleProduct(productId);
    const { id } = await singleProduct.json();
    const relatedProducts = await this.request.get(
      `${this.apiBaseUrl}/products/${id}/related`
    );
    return relatedProducts;
  }

  async searchProducts(therm: string) {
    return this.request.get(`${this.apiBaseUrl}/products?q=${therm}`);
  }
}

export default ProductsApi;
