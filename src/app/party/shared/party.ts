import { User } from '../../core/auth/user.model';

export interface Party {
  id?: string;
  members?: User[];
  leader: string;
  selectedGame: string;
  joinCode: string;
  created: number;
}
