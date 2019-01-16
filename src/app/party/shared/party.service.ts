import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/firebase/firestore/firestore.service';
import { Party } from './party';
import {Observable, combineLatest, of, throwError} from 'rxjs';
import {map, switchMap, take, shareReplay} from 'rxjs/operators';
import { Game } from '../../games/shared/game.model';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private readonly path = 'parties';
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

  getPartyByJoinCode(joinCode: number): Observable<Party> {
    return this.firestoreService.list(this.path,
      ref => ref.where('joinCode', '==', joinCode)
    ).pipe(
      map(parties => parties[0])
    );
  }

  getPartyById(id: string): Observable<Party> {
    return this.firestoreService.get(this.path, id);
  }

  async createNewPartyFromGame(game: Game): Promise<Party> {
    const joinCode = await this.getNewJoinCode(6);
    const user = await this.authService.loginAnonymously();
    const party: Party = {
      leader: user.id,
      selectedGame: game.id,
      joinCode: joinCode,
      created: Date.now(),
    };
    return this.createParty(party).then((newParty) => {
      this.authService.upsertUserParty(newParty.id);
      return party;
    });
  }

  setParty() {
    this.partyObservable = this.authService.user.pipe(
      switchMap(user => {
        if (user && user.partyId) {
          const partyId = user.partyId;
          return combineLatest(this.getPartyById(partyId), this.authService.getUsersByPartyId(partyId)).pipe(
            map(([party, users]) => {
              if (party) {
                this._isGameLeader = user.id === party.leader;
                party.members = users;
                console.log('setting party', party);
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
      }),
      shareReplay()
    );
  }

  leaveParty(): Promise<any> {
    if (this.isGameLeader) {
      return this.changePartyLeader().toPromise().then(() => {
        return this.authService.removePartyId();
      });
    } else {
      return this.authService.removePartyId();
    }
  }

  changePartyLeader(): Observable<void> {
    return combineLatest(this.partyObservable, this.authService.user).pipe(
      take(1),
      switchMap(([party, user]) => {
        // If other users change leader
        const members = party.members;
        if (members.length === 1) {
          return this.firestoreService.delete(this.path, user.partyId);
        }
        const leader = members[0].id === user.id ? members[1] : members[0];

        return this.firestoreService.upsert(this.path, user.partyId, {leader: leader.id});
      })
    );
  }

  joinGame(joinCode: number): Promise<any> {
    return this.getPartyByJoinCode(joinCode).pipe(
      take(1),
      switchMap(party => {
        if (party) {
          this.authService.loginAnonymously().then(() => {
            return this.authService.joinParty(party);
          });
        } else {
          return throwError('No party with joinCode: ' + joinCode);
        }
      })).toPromise();
  }

  checkJoinCodeExists(joinCode: number): Promise<boolean> {
    return this.firestoreService.check(this.path, 'joinCode', joinCode);
  }

  async getNewJoinCode(length: number): Promise<number> {
    const newId = Math.floor(Math.random() * (10 ** length));
    const exists = await this.checkJoinCodeExists(newId);
    if (!exists) {
      return newId;
    } else {
      return this.getNewJoinCode(length);
    }
  }
}
