import { Injectable } from '@angular/core';
import {FirestoreService} from '../../core/firebase/firestore/firestore.service';
import {GameInstance} from './game-instance';
import { Observable, of } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { PartyService } from '../../party/shared/party.service';

@Injectable({
  providedIn: 'root'
})
export class GameInstanceService {

  private readonly path = 'game-instances';
  private gameInstanceObservable: Observable<GameInstance>;

  constructor(
    private firestoreService: FirestoreService<GameInstance>,
    private partyService: PartyService,
  ) {
    this.setGameInstance();
  }

  get gameInstance() {
    return this.gameInstanceObservable;
  }

  createNewGameInstance(gameInstance: GameInstance): Promise<void> {
    return this.firestoreService.insert(this.path, gameInstance);
  }

  getGameInstanceByPartyId(partyId: string): Observable<GameInstance> {
    if (!partyId) { return of(null); }
    return this.firestoreService.list(this.path, ref => ref
      .where('partyId', '==', partyId)).pipe(
      map(games => games [0])
    );
  }

  updateGameInstance(gameInstance: GameInstance): Promise<any> {
    return this.firestoreService.update(this.path, gameInstance.id, gameInstance);
  }

  setGameInstance() {
    this.gameInstanceObservable = this.partyService.party.pipe(
      switchMap(party => {
        if (party) {
          return this.getGameInstanceByPartyId(party.id);
        } else {
          return of(null);
        }
      }),
      shareReplay()
    );
  }
}
