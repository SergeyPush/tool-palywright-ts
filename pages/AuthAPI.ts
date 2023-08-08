import { APIRequest, request } from "@playwright/test";
import { CreateUserData, CreateUserResponse } from "../types/user.type";
import { writeJSON } from "fs-extra";

class AuthAPI {
  private request: APIRequest;
  private apiBaseUrl: string;

  constructor() {
    this.request = request;
    this.apiBaseUrl = "https://api.practicesoftwaretesting.com";
  }

  private async createContext() {
    return this.request.newContext({
      baseURL: this.apiBaseUrl,
    });
  }

  async login(email: string, password: string): Promise<string> {
    const api = await this.createContext();
    const res = await api.post("/users/login", {
      data: {
        email,
        password,
      },
    });

    const { access_token } = await res.json();
    return access_token;
  }

  async createAccount(data: CreateUserData): Promise<CreateUserResponse> {
    const api = await this.createContext();
    const res = await api.post("/users/register", {
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
