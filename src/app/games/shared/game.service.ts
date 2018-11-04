import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/firebase/firestore/firestore.service';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly path = 'game';

  constructor(
    private firestoreService: FirestoreService<Game>
  ) { }

  getGames() {
    return this.firestoreService.list(this.path);
  }

  getGame(id) {
    return this.firestoreService.get(this.path, id);
  }
}
