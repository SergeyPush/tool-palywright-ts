import { readJSON, remove } from "fs-extra";

export const getTokenFromJson = async (): Promise<string> => {
  try {
    const file = "token.json";
    const data = await readJSON(file);
    return data.access_token;
  } catch (error) {
    return "";
  }
};

export const removeTokenFile = async () => {
  const file = "token.json";
  await remove(file);
};
