import { Injectable } from '@angular/core';
import {Party} from '../../../party/shared/party';
import {NhieGameInstance} from './nhie-game-instance';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {GameInstanceService} from '../../shared/game-instance.service';
import { combineLatest, Observable } from 'rxjs';
import {PartyService} from '../../../party/shared/party.service';
import {switchMap, take, map} from 'rxjs/operators';
import { NhieQuestionService } from './nhie-question.service';
import { Nhie } from './nhie';

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

  getGameInstanceQuestions(startAt: number): Observable<string[]> {
    return this.nhieQuestionService.getQuestions(startAt);
  }

  getGameInstanceByJoinCode(joinCode: string) {
    return <Observable<NhieGameInstance>>this.gameInstanceService.getGameInstanceByJoinCode(joinCode);
  }

  generateNewGameInstanceFromCode(joinCode: string): Promise<void> {
    return combineLatest(this.partyService.getPartyByJoinCode(joinCode), this.getGameInstanceQuestions(0)).pipe(
      switchMap(([party, questions]: [Party, string[]]) => {
        const gameInstance = <NhieGameInstance>{
          partyId: party.id,
          gameId: party.selectedGame,
          gameLeader: party.leader,
          joinCode: party.joinCode,
          genericQuestions: questions,
          manualQuestions: [],
          currentQuestion: questions.pop()
        };
        return this.gameInstanceService.createNewGameInstance(gameInstance);
      })
    ).toPromise();
  }

  updateGameInstance(gameInstance: NhieGameInstance): Promise<any> {
    return this.gameInstanceService.updateGameInstance(gameInstance);
  }

}
