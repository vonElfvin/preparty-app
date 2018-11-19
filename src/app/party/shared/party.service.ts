import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/firebase/firestore/firestore.service';
import { Party } from './party';
import {Observable, combineLatest, of, from} from 'rxjs';
import {map, tap, switchMap, take} from 'rxjs/operators';
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
      map(party => party && party.leader === this.authService.uid)
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
        if (user && user.partyId) {
          const partyId = user.partyId;
          console.log(user);
          return combineLatest(this.getPartyById(partyId), this.authService.getUsersByPartyId(partyId)).pipe(
            map(([party, users]) => {
              if (party) {
                this._isGameLeader = user.id === party.leader;
                party.members = users;
                return party;
              } else {
                return of (null);
              }
            })
          );
        } else {
          this._isGameLeader = false;
          return of(null);
        }
      })
    );
  }

  leaveParty(): Promise<any> {
    if (this.isGameLeader) {
      return this.changePartyLeader().toPromise().then(res => {
        this.authService.removePartyId();
      });
    } else {
      return this.authService.removePartyId();
    }
  }

  changePartyLeader(): Observable<void> {
    return  this.authService.user.pipe(
      take(1),
      switchMap(user => {
        return combineLatest(this.getPartyById(user.partyId), this.authService.getUsersByPartyId(user.partyId)).pipe(
          take(1),
          switchMap(([party, users]) => {
            // If other users change leader
            console.log(users);
            console.log(party);
            if (users.length === 1) {
              console.log('tjena');
              return this.firestoreService.delete(this.path, user.partyId);
            }
            return this.firestoreService.upsert(this.path, user.partyId, {leader: users[0].id});
          })
        );
      })
    );
  }

}
