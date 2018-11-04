export enum Role {
  anonymous = 'anonymous',
  admin = 'admin',
}

export interface User {
  id?: string;
  alias: string;
  role: Role;
}
