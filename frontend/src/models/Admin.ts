export type AdminToken = {
  token: string;
};

export type Admin = {
  id: string;
  login: string;
  role: Role;
};

export type Role = 'caest' | 'cozinha';
