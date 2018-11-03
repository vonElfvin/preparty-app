import { Injectable } from '@angular/core';
import {Party} from '../../../party/shared/party';
import {NhieGameInstance} from './nhie-game-instance';
import {FirestoreService} from '../../../core/firebase/firestore/firestore.service';
import {GameInstanceService} from '../../shared/game-instance.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhieService {

  private readonly gameId = 'nhie';
  private readonly path = 'GameInstance';


  constructor(private firestoreService: FirestoreService<NhieGameInstance>,
              private gameInstanceService: GameInstanceService) { }

  getGameInstanceQuestions(): string[] {
    return ['ätit mat', 'fångat fisk', 'kastat sten', 'varit skön',
    'krökat'];
  }


  addQuestionToGameInstance(gameInstanceId: string, question: string) {
    console.log(`gameinstance: ${gameInstanceId} question:${question}`);
  }

  generateNewGameInstance(party: Party): Promise<void> {
    const gameInstance = <NhieGameInstance>{
      partyId: party.id,
      gameId: this.gameId,
      joinCode: party.joinCode,
      genericQuestions: this.getGameInstanceQuestions(),
      manualQuestions: []
    };
    return this.gameInstanceService.createNewGameInstance(gameInstance);
  }


  getGameInstanceByJoinCode(joinCode: string): Observable<NhieGameInstance> {
    return <Observable<NhieGameInstance>>this.gameInstanceService.getGameInstanceByJoinCode(joinCode);
    
  }

}
