import { Injectable } from '@angular/core';
import {FirestoreService} from '../../core/firebase/firestore/firestore.service';
import {Party} from './party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private firestoreService: FirestoreService<Party>) { }

  addParty(party: Party) {
  }

}
