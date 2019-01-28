import { Injectable } from '@angular/core';
import {GameInstanceService} from '../../shared/game-instance.service';
import {PartyService} from '../../../party/shared/party.service';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {ThisOrThatGameInstance, ThisOrThatVote} from './thisOrThat';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {Party} from '../../../party/shared/party';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThisOrThatGameInstanceService {

  path = 'game-instances';
  flip: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private gameInstanceService: GameInstanceService, private partyService: PartyService,
              private firestoreService: FirestoreService<ThisOrThatGameInstance>) { }

  getGameInstance(): Observable<ThisOrThatGameInstance> {
    return <Observable<ThisOrThatGameInstance>> this.gameInstanceService.gameInstance;
  }

  updateGameInstance(gameInstance: ThisOrThatGameInstance): Promise<void> {
    return this.gameInstanceService.updateGameInstance(gameInstance);
  }

  createGameInstance(): Promise<void> {

    return this.partyService.party.pipe(take(1), switchMap((party: Party) => {
      const questions = [{ dis: 'Big Mac?', that: 'mcFlurry?', id: '1', index: 1},
        { dis: 'cheese?', that: 'ham?', id: '2', index: 2},
        { dis: 'soda', that: 'juice?', id: '3', index: 3},
        { dis: 'dough?', that: 'freedom?', id: '4', index: 4},
        { dis: 'rich?', that: 'handsome?', id: '5', index: 5},
        { dis: 'hungry?', that: 'thirsty?', id: '6', index: 6},
        { dis: 'fat?', that: 'super fat?', id: '7', index: 7},
        { dis: 'Mc Feast?', that: 'chicken nuggets?', id: '8', index: 8}
       ];
      if (!party) { return of(null); }
      console.log(party);
      const votingGameInstance = <ThisOrThatGameInstance> {
        partyId: party.id,
        gameId: party.selectedGame,
        gameLeader: party.leader,
        joinCode: party.joinCode,
        created: Date.now(),
        genericQuestions: questions,
        currentQuestion: questions.shift(),
        manualQuestions: [],
        seenQuestions: [],
        oldVotes: [],
        currentVotes: [],
        viewResults: false
      };
      return this.gameInstanceService.createNewGameInstance(votingGameInstance);
    })).toPromise();
  }

  sendVote(vote: ThisOrThatVote, gameInstanceId: string) {
    return this.firestoreService.update(this.path, gameInstanceId,
     {currentVotes: firebase.firestore.FieldValue.arrayUnion(vote)});
  }

  removeVote(vote: ThisOrThatVote, gameInstanceId: string) {
    return this.firestoreService.update(this.path, gameInstanceId,
     {currentVotes: firebase.firestore.FieldValue.arrayRemove(vote)});
  }

  setViewing(gameInstanceId: string, value: boolean) {
    this.flip.next(value);
    return this.firestoreService.update(this.path, gameInstanceId,
      {viewResults: value});
  }
}
