export interface CreateUserData {
  first_name: string;
  last_name: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  first_name: string;
  last_name: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: number;
  phone: number;
  email: string;
  id: string;
}
