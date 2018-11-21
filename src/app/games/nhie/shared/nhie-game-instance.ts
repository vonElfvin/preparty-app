import { GameInstance } from '../../shared/game-instance';
import { NhieQuestion } from './nhie';

export interface NhieGameInstance extends GameInstance {
  genericQuestions: NhieQuestion[];
  manualQuestions: NhieQuestion[];
  currentQuestion: NhieQuestion;
  seenQuestions: number[];
}
