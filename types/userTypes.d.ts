export interface LoginResponse {
  data: {
    bearer_token: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}