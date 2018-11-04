import { Injectable } from '@angular/core';
import { FirestoreService } from '../../core/firebase/firestore/firestore.service';
import { Party } from './party';
import { Observable, combineLatest } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { Game } from '../../games/shared/game.model';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private readonly path = 'party';

  constructor(private firestoreService: FirestoreService<Party>, private authService: AuthService) { }

  createParty(party: Party): Promise<Party> {
    return this.firestoreService.insert(this.path, party);
  }

  updateParty(partyId: string, party: Party): Promise<void> {
    return this.firestoreService.update(this.path, partyId, party);
  }

  getPartyById(id: string): Observable<Party> {
    return this.firestoreService.get(this.path, id);
  }

  getPartyByJoinCode(joinCode: string): Observable<Party> {
    return this.firestoreService.getItems(this.path,
      ref => ref.where('joinCode', '==', joinCode)
    ).
      pipe(map(
        parties => parties[0])
      );
  }

  createNewPartyFromGame(game: Game): Promise<Party> {
    return this.authService.loginAnonymously().then(user => {
      const party = <Party>{
        users: [user.id],
        leader: user.id,
        selectedGame: game.id,
        joinCode: Math.random().toString(36).substring(7)
      };
      return this.createParty(party).then(() => {
        return party;
      });
    });
  }

  getAliasesOfParty(party: Party): Observable<string[]> {

    let aliases: Observable<string>[] = [];

    party.users.forEach((user) => {
      aliases.push(this.authService.userAliasByUid(user));
    });

    let wholeAlias: Observable<string[]> = combineLatest(aliases);

    return wholeAlias;
  }

}
