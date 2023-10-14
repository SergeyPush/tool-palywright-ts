import { BaseSchema, parse } from "valibot"; // 0.87 kB

import { Schema, ZodError } from "zod";
export function validateJson(received: Schema, data: Object) {
  try {
    // parse(received, data);
    received.parse(data);
    return {
      message: () => "Validation passed",
      pass: true,
    };
  } catch (error) {
    // console.log(JSON.stringify(error));
    const err = error as ZodError;
    return {
      message: () =>
        // `${error.message}, Field: ${error.issues[0].path[0].key} Expected: ${error.issues[0].validation}. Recieved: ${error.issues[0].input}`,
        `${JSON.stringify(err.format())}`,
      // `${
      //   err.formErrors.formErrors || JSON.stringify(err.formErrors.formErrors)
      // } ${JSON.stringify(err.formErrors.fieldErrors)}`,
      pass: false,
    };
  }
}
