import { readJSON, remove } from "fs-extra";

export const getTokenFromJson = async (): Promise<string | null> => {
  try {
    const file = "token.json";
    const data = await readJSON(file);
    return data.access_token;
  } catch (error) {
    return null;
  }
};

export const removeTokenFile = async () => {
  const file = "token.json";
  await remove(file);
};
