import { Injectable } from '@angular/core';
import {GameInstanceService} from '../../shared/game-instance.service';
import {PartyService} from '../../../party/shared/party.service';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {ThisOrThatGameInstance, Vote} from './thisOrThat';
import {Observable, of} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {Party} from '../../../party/shared/party';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ThisOrThatGameInstanceService {

  path = 'game-instances';

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
      const questions = [{ question: 'Who is most likely to buy a Big Mac?', id: '1', index: 1},
        {question: 'Who is most likely to get most drunk tonight?', id: '2', index: 2},
        {question: 'Who is the smartest?', id: '3', index: 3},
        {question: 'Who is most likely to get kids first?', id: '4', index: 4},
        {question: 'Whose eating skills are most impressive', id: '5', index: 5},
        {question: 'Who would you bring to an empty island?', id: '6', index: 6},
        {question: 'Who would you bring to På spåret?', id: '6', index: 6}];
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

  sendVote(vote: Vote, gameInstanceId: string) {
    return this.firestoreService.update(this.path, gameInstanceId,
     {currentVotes: firebase.firestore.FieldValue.arrayUnion(vote)});
  }

  removeVote(vote: Vote, gameInstanceId: string) {
    return this.firestoreService.update(this.path, gameInstanceId,
     {currentVotes: firebase.firestore.FieldValue.arrayRemove(vote)});
  }

  setViewing(gameInstanceId: string, value: boolean) {
    return this.firestoreService.update(this.path, gameInstanceId,
      {viewResults: value});
  }
}
