import AuthAPI from "./api/auth-api.api";
import { createUser } from "./utils/create-user.utils";

export async function globalSetup({ request }) {
  const user = createUser();
  const authApi = new AuthAPI(request);
  const createdUser = await authApi.createAccount(user);

  const token = await authApi.login(createdUser.email, user.password);
  await authApi.saveTokenToJson(token);
}

export default globalSetup;
