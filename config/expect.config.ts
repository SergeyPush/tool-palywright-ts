import { BaseSchema, parse } from "valibot"; // 0.87 kB

export function validateJson(received: BaseSchema, data: any) {
  try {
    parse(received, data);
    return {
      message: () => "Validation passed",
      pass: true,
    };
  } catch (error) {
    // console.log(JSON.stringify(error));
    return {
      message: () =>
        `${error.message}, Field: ${error.issues[0].path[0].key} Expected: ${error.issues[0].validation}. Recieved: ${error.issues[0].input}`,
      pass: false,
    };
  }
}
