import { email, minLength, object, parse, string, BaseSchema } from "valibot"; // 0.87 kB

export function validateJson(received: BaseSchema, data: any) {
  try {
    parse(received, data);
    return {
      message: () => "Validation passed",
      pass: true,
    };
  } catch (error) {
    return {
      message: () =>
        `${error.message}, Expected: ${error.issues[0].validation}. Recieved: ${error.issues[0].input}`,
      pass: false,
    };
  }
}
