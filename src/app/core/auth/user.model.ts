export enum Role {
  anonymous = 'anonymous',
  admin = 'admin',
}

export interface User {
  id?: string;
  name: string;
  role: Role;
}
