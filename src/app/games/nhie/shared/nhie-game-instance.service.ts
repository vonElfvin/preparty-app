import { Injectable } from '@angular/core';
import {Party} from '../../../party/shared/party';
import {NhieGameInstance} from './nhie-game-instance';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {GameInstanceService} from '../../shared/game-instance.service';
import {combineLatest, Observable, of} from 'rxjs';
import {PartyService} from '../../../party/shared/party.service';
import {switchMap, take, map} from 'rxjs/operators';
import { NhieQuestionService } from './nhie-question.service';
import { Nhie, NhieQuestion } from './nhie';

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

  getGameInstanceByJoinCode(joinCode: string): Observable<NhieGameInstance> {
    return <Observable<NhieGameInstance>>this.gameInstanceService.getGameInstanceByJoinCode(joinCode);
  }

  generateNewGameInstanceFromCode(joinCode: string): Promise<void> {
    return combineLatest(
      this.partyService.getPartyByJoinCode(joinCode),
      this.getGameInstanceQuestions([])
    ).pipe(
        switchMap(([party, questions]: [Party, NhieQuestion[]]) => {
          if (!party) { return of(null); }
          const gameInstance = <NhieGameInstance>{
            partyId: party.id,
            gameId: party.selectedGame,
            gameLeader: party.leader,
            joinCode: party.joinCode,
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
