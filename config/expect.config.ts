import { BaseSchema, parse, flatten } from "valibot"; // 0.87 kB

export function validateJson(received: BaseSchema, data: any) {
  try {
    parse(received, data);
    return {
      message: () => "Validation passed",
      pass: true,
    };
  } catch (error) {
    return {
      message: () => `${JSON.stringify(flatten(error))}`,
      pass: false,
    };
  }
}
