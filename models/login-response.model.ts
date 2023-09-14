import { number, object, string } from "valibot";

export const LoginResponseModel = object({
  access_token: string(),
  token_type: string(),
  expires_in: number(),
});
