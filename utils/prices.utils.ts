function stripDollars(data: string): number;
function stripDollars(data: string[]): number[];
function stripDollars(data: string[] | string): number | number[] {
  const priceWithDollars = (price: string) => Number(price.split("$").pop());
  if (Array.isArray(data)) {
    return data.map((item) => priceWithDollars(item));
  }
  return Number(priceWithDollars(data));
}
export { stripDollars };
