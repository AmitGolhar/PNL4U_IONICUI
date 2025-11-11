export type Role = 'ROLE_ADMIN' | 'ROLE_CLUBADMIN' | 'ROLE_USER' | 'ROLE_PROMOTERS' | 'ROLE_INFLUENCERS';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
  token?: string; // optional JWT from backend
}
