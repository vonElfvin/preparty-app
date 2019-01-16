import {GameInstance} from '../../shared/game-instance';

export interface VotingGameQuestion {
  id?: string;
  question: string;
  level?: number;
  index?: number;
}

export interface Vote {
  voterId: string;
  votedOnId: string;
  questionId: string;
}

export interface ThisOrThatGameInstance extends GameInstance {
  genericQuestions: VotingGameQuestion[];
  manualQuestions: VotingGameQuestion[];
  currentQuestion: VotingGameQuestion;
  currentVotes: Vote[];

  oldVotes: Vote[];
  seenQuestions: number[];
  viewResults: boolean;
}
