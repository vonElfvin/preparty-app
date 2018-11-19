import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/firebase/firestore/firestore.service';
import { Party } from './party';
import { Observable, combineLatest, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Game } from '../../games/shared/game.model';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private readonly path = 'party';
  private partyObservable: Observable<Party>;
  private _isGameLeader = false;

  constructor (
    private firestoreService: FirestoreService<Party>,
    private authService: AuthService
  ) {
    this.setParty();
  }

  get party() {
    return this.partyObservable;
  }

  get isGameLeader() {
    return this._isGameLeader;
  }

  get isGameLeaderObservable() {
    return this.party.pipe(
      map(party => party.leader === this.authService.uid)
    );
  }

  createParty(party: Party): Promise<Party> {
    return this.firestoreService.insert(this.path, party);
  }

  getPartyByJoinCode(joinCode: string): Observable<Party> {
    return this.firestoreService.list(this.path,
      ref => ref.where('joinCode', '==', joinCode)
    ).pipe(
      map(parties => parties[0])
    );
  }

  getPartyById(id: string): Observable<Party> {
    return this.firestoreService.get(this.path, id);
  }

  createNewPartyFromGame(game: Game): Promise<Party> {
    return this.authService.loginAnonymously().then(user => {
      const party: Party = {
        leader: user.id,
        selectedGame: game.id,
        joinCode: Math.random().toString(36).substring(7)
      };
      return this.createParty(party).then((newParty) => {
        this.authService.upsertUserParty(newParty.id);
        return party;
      });
    });
  }

  checkPartyExists(joinCode: string) {
    return this.firestoreService.check(this.path, 'joinCode', joinCode);
  }

  setParty() {
    this.partyObservable = this.authService.user.pipe(
      switchMap(user => {
        if (user) {
          const partyId = user.partyId;
          console.log(user);
          return combineLatest(this.getPartyById(partyId), this.authService.getUsersByPartyId(partyId)).pipe(
            map(([party, users]) => {
              this._isGameLeader = user.id === party.leader;
              party.members = users;
              return party;
            })
          );
        } else {
          this._isGameLeader = false;
          return of(null);
        }
      })
    );
  }

}
