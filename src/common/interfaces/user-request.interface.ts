export interface UserRequest {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
}
