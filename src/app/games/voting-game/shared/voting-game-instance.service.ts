import { Injectable } from '@angular/core';
import {GameInstanceService} from '../../shared/game-instance.service';
import {Observable, of} from 'rxjs';
import {Vote, VotingGameInstance} from './voting-game';
import {Party} from '../../../party/shared/party';
import {PartyService} from '../../../party/shared/party.service';
import {switchMap, take} from 'rxjs/operators';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class VotingGameInstanceService {

  path = 'game-instances';

  constructor(private gameInstanceService: GameInstanceService, private partyService: PartyService,
              private firestoreService: FirestoreService<VotingGameInstance>) { }

  getGameInstance(): Observable<VotingGameInstance> {
    return <Observable<VotingGameInstance>> this.gameInstanceService.gameInstance;
  }

  updateGameInstance(gameInstance: VotingGameInstance): Promise<void> {
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
      const votingGameInstance = <VotingGameInstance> {
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
    console.log(gameInstanceId);
    return this.firestoreService.update(this.path, gameInstanceId, {currentVotes: firebase.firestore.FieldValue.arrayUnion(vote)});
  }

  removeVote(vote: Vote, gameInstanceId: string) {
    return this.firestoreService.update(this.path, gameInstanceId, {currentVotes: firebase.firestore.FieldValue.arrayRemove(vote)});
  }

  setViewing(gameInstanceId: string, value: boolean){
    return this.firestoreService.update(this.path, gameInstanceId, {viewResults: value});
  }

}
