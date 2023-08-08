import { CreateUserData } from "../types/user.type";
import { faker } from "@faker-js/faker";

export const createUser = (): CreateUserData => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  dob: "1985-12-12",
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: "UA",
  postcode: faker.location.zipCode(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  password: "123456",
});
