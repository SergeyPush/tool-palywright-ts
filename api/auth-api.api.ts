import { APIRequestContext } from "@playwright/test";
import {
  CreateUserData,
  CreateUserResponse,
  IUserResponseInfo,
} from "../types/user.type";
import { writeJSON } from "fs-extra";
import { API_BASE_URL } from "../utils/get-config.utils";

class AuthAPI {
  private apiBaseUrl: string = API_BASE_URL;

  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string) {
    const res = await this.request.post(`${this.apiBaseUrl}/users/login`, {
      data: {
        email,
        password,
      },
    });
    return res.json();
  }

  async createAccount(data: CreateUserData): Promise<CreateUserResponse> {
    const res = await this.request.post(`${this.apiBaseUrl}/users/register`, {
      data,
    });
    return res.json();
  }

  async getUserInfo(token: string) {
    const res = await this.request.get(`${this.apiBaseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return (await res.json()) as IUserResponseInfo;
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
