import { Injectable } from '@angular/core';
import {GameInstanceService} from '../../shared/game-instance.service';
import {Observable, of} from 'rxjs';
import {Vote, VotingGameInstance} from './voting-game';
import {Party} from '../../../party/shared/party';
import {PartyService} from '../../../party/shared/party.service';
import {switchMap} from 'rxjs/operators';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import * as firebase from 'firebase';


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

  createGameInstance(): Promise<void> {
    const questions = [{ question: 'Who is most likely to buy a Big Mac?', id: '1'},
      {question: 'Who is most likely to get most drunk tonight?', id: '1'},
      {question: 'Who is the smartest?', id: '1'},
      {question: 'Who is most likely to get kids first?', id: '1'}];
    return this.partyService.party.pipe(switchMap(party => {
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
        currentVotes: []
      };
      return this.gameInstanceService.createNewGameInstance(votingGameInstance);
    })).toPromise();
  }

  sendVote(vote: Vote, gameInstanceId: string) {
    console.log(gameInstanceId);
    return this.firestoreService.update(this.path, gameInstanceId, {currentVotes: firebase.firestore.FieldValue.arrayUnion(vote)});
  }


}
