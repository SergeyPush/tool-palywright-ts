import AuthAPI from "./pages/AuthAPI";
import { createUser } from "./utils/create-user.utils";

export async function globalSetup() {
  const user = createUser();
  const authApi = new AuthAPI();
  const createdUser = await authApi.createAccount(user);

  const token = await authApi.login(createdUser.email, user.password);
  await authApi.saveTokenToJson(token);
}

export default globalSetup;
