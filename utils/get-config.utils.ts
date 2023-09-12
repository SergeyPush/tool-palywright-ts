import { config } from "dotenv";

config();

export const API_BASE_URL = check(process.env.API_BASE_URL);
export const BASE_URL = check(process.env.BASE_URL);

function check(value: string | undefined) {
  if (typeof value === "string") {
    return value;
  }
  throw Error("Environment variable is not found");
}
