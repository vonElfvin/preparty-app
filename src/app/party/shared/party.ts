export interface Party {
  id?: string;
  users: string[];
  admin: string;
  selectedGame: string;
  joinCode: string;
}
