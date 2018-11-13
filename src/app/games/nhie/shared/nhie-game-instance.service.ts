import { Injectable } from '@angular/core';
import {Party} from '../../../party/shared/party';
import {NhieGameInstance} from './nhie-game-instance';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {GameInstanceService} from '../../shared/game-instance.service';
import {Observable} from 'rxjs';
import {PartyService} from '../../../party/shared/party.service';
import {switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NhieGameInstanceService {

  private readonly path = 'GameInstance';


  constructor(private firestoreService: FirestoreService<NhieGameInstance>,
              private gameInstanceService: GameInstanceService, private partyService: PartyService) { }

  getGameInstanceQuestions(): string[] {
    return ['ätit mat', 'fångat fisk', 'kastat sten', 'varit skön', 'krökat'];
  }


  addQuestionToGameInstance(gameInstanceId: string, question: string) {
    console.log(`gameinstance: ${gameInstanceId} question:${question}`);
  }

  generateNewGameInstance(party: Party): Promise<void> {
    const gameInstance = <NhieGameInstance>{
      partyId: party.id,
      gameId: party.selectedGame,
      joinCode: party.joinCode,
      genericQuestions: this.getGameInstanceQuestions(),
      manualQuestions: []
    };
    return this.gameInstanceService.createNewGameInstance(gameInstance);
  }

  generateNewGameInstanceFromCode(joinCode: string): Promise<void> {
    return this.partyService.getPartyByJoinCode(joinCode).pipe(
      take(1),
      switchMap((party: Party) => {
      const gameInstance = <NhieGameInstance>{
        partyId: party.id,
        gameId: party.selectedGame,
        joinCode: party.joinCode,
        genericQuestions: this.getGameInstanceQuestions(),
        manualQuestions: [],
        currentQuestion: this.getGameInstanceQuestions().pop()
      };
      return this.gameInstanceService.createNewGameInstance(gameInstance);
    })).toPromise();
  }

  updateGameInstance(gameInstance: NhieGameInstance): Promise<any> {
    return this.gameInstanceService.updateGameInstance(gameInstance);
  }


  getGameInstanceByJoinCode(joinCode: string): Observable<NhieGameInstance> {
    return <Observable<NhieGameInstance>>this.gameInstanceService.getGameInstanceByJoinCode(joinCode);
  }

}
