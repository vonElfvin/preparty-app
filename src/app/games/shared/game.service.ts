import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/firebase/firestore/firestore.service';
import { Game } from './game.model';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { PartyService } from '../../party/shared/party.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly path = 'game';
  private gameObservable: Observable<Game>;

  constructor(
    private firestoreService: FirestoreService<Game>,
    private partyService: PartyService,
  ) {
    this.setGame();
  }

  get game() {
    return this.gameObservable;
  }

  getGames() {
    return this.firestoreService.list(this.path);
  }

  getGame(id) {
    return this.firestoreService.get(this.path, id);
  }

  setGame() {
    this.gameObservable = this.partyService.party.pipe(
      switchMap(party => {
        if (party) {
          console.log('setting game', party);
          return this.getGame(party.selectedGame);
        } else {
          return of(null);
        }
      }),
      shareReplay()
    );
  }
}
