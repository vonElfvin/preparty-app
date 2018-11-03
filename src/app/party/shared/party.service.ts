import { Injectable } from '@angular/core';
import {FirestoreService} from '../../core/firebase/firestore/firestore.service';
import {Party} from './party';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyService {


  private readonly path = 'party';

  constructor(private firestoreService: FirestoreService<Party>) { }

  createParty(party: Party): Promise<Party> {
    return this.firestoreService.insert(this.path, party);
  }

  updateParty(partyId: string, party: Party): Promise<void> {
     return this.firestoreService.update(this.path, partyId, party);
  }

  getPartyById(id: string): Observable<Party> {
    return this.firestoreService.get(this.path, id);
  }

  getPartyByJoinCode(joinCode: string): Observable<Party>  {
    return this.firestoreService.getItems(this.path, ref => ref.where('joinCode', '==', joinCode)).
    pipe(map(parties => parties[0]));
  }

}
