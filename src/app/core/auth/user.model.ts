export enum Role {
  anonymous = 'anonymous',
  admin = 'admin',
}

export interface User {
  id?: string;
  partyId?: string;
  alias: string;
  role: Role;
}
