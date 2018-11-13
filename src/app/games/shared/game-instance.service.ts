import { Injectable } from '@angular/core';
import {FirestoreService} from '../../core/firebase/firestore/firestore.service';
import {Party} from '../../party/shared/party';
import {GameInstance} from './game-instance';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameInstanceService {


  private readonly path = 'game-instances';


  constructor(private firestoreService: FirestoreService<GameInstance>) { }


  createNewGameInstance(gameInstance: GameInstance): Promise<void> {
    return this.firestoreService.insert(this.path, gameInstance);
  }

  getGameInstanceByJoinCode(joinCode: string): Observable<GameInstance> {
    return this.firestoreService.list(this.path, ref => ref.where('joinCode', '==', joinCode)).
    pipe(map(games => games [0]));
  }

  updateGameInstance(gameInstance: GameInstance): Promise<any> {
    return this.firestoreService.update(this.path, gameInstance.id, gameInstance);
  }


}
