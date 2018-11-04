export interface Party {
  id?: string;
  users: string[];
  leader: string;
  selectedGame: string;
  joinCode: string;
}
