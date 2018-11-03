import {GameInstance} from '../../shared/game-instance';

export interface NhieGameInstance extends GameInstance {
  genericQuestions: string[];
  manualQuestions: string[];
}
