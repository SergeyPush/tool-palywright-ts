import { APIRequest, APIRequestContext, request } from "@playwright/test";
import { CreateUserData, CreateUserResponse } from "../types/user.type";
import { writeJSON } from "fs-extra";
import { API_BASE_URL } from "../utils/get-config.utils";

class AuthAPI {
  private apiBaseUrl: string = API_BASE_URL;

  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string): Promise<string> {
    const res = await this.request.post(`${this.apiBaseUrl}/users/login`, {
      data: {
        email,
        password,
      },
    });
    const { access_token } = await res.json();
    return access_token;
  }

  async createAccount(data: CreateUserData): Promise<CreateUserResponse> {
    const res = await this.request.post(`${this.apiBaseUrl}/users/register`, {
      data,
    });
    const createdAccount = await res.json();
    return createdAccount;
  }

  async saveTokenToJson(token: string) {
    const file = "token.json";
    try {
      await writeJSON(file, { access_token: token });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthAPI;
