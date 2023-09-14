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

export interface IUserResponseInfo {
  id: string;
  provider: null;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  dob: string;
  email: string;
  failed_login_attempts: number;
  created_at: string;
}
