import { test } from "../../config/config";
import { expect } from "@playwright/test";
import { InvoiceResponseModel } from "../../models/invoice-response.model";

test.describe("Invoices tests @api tests", () => {
  test("User can create invoice @api", async ({ api, token }) => {
    const res = await api.invoiceApi.createInvoice(token);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(InvoiceResponseModel).validateJson(data);
  });

  test("Get list of invoices @api", async ({ api, token }) => {
    await api.invoiceApi.createInvoice(token);
    const res = await api.invoiceApi.getInvoicesList(token);
    const { data } = await res.json();
    expect(InvoiceResponseModel).validateJson(data[0]);
  });
});
