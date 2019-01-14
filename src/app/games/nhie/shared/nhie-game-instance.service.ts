import { Injectable } from '@angular/core';
import {Party} from '../../../party/shared/party';
import {NhieGameInstance} from './nhie-game-instance';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {GameInstanceService} from '../../shared/game-instance.service';
import {combineLatest, Observable, of} from 'rxjs';
import {PartyService} from '../../../party/shared/party.service';
import {switchMap} from 'rxjs/operators';
import { NhieQuestionService } from './nhie-question.service';
import { NhieQuestion } from './nhie';

@Injectable({
  providedIn: 'root'
})
export class NhieGameInstanceService {

  constructor(
    private firestoreService: FirestoreService<NhieGameInstance>,
    private nhieQuestionService: NhieQuestionService,
    private gameInstanceService: GameInstanceService,
    private partyService: PartyService
  ) { }

  getGameInstanceQuestions(seenQuestions: number[]): Observable<NhieQuestion[]> {
    return this.nhieQuestionService.getQuestions(seenQuestions);
  }

  getGameInstance(): Observable<NhieGameInstance> {
    return <Observable<NhieGameInstance>>this.gameInstanceService.gameInstance;
  }

  generateNewGameInstance(): Promise<void> {
    return combineLatest(
      this.partyService.party,
      this.getGameInstanceQuestions([])
    ).pipe(
        switchMap(([party, questions]: [Party, NhieQuestion[]]) => {
          const gameInstance = <NhieGameInstance>{
            partyId: party.id,
            gameId: party.selectedGame,
            joinCode: party.joinCode,
            gameLeader: party.leader,
            created: Date.now(),
            genericQuestions: questions,
            currentQuestion: questions.shift(),
            manualQuestions: [],
            seenQuestions: [],
          };
          return this.gameInstanceService.createNewGameInstance(gameInstance);
        })
    ).toPromise();
  }

  updateGameInstance(gameInstance: NhieGameInstance): Promise<any> {
    return this.gameInstanceService.updateGameInstance(gameInstance);
  }

}
