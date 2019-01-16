import {GameInstance} from '../../shared/game-instance';

export interface ThisOrThatQuestion {
  id?: string;
  dis: string;
  that: string;
  level?: number;
  index?: number;
}

export enum VoteValue {
  dis = 'dis',
  that = 'that'
}

export interface ThisOrThatVote {
  voterId: string;
  votedOn: VoteValue;
  questionId: string;
}

export interface ThisOrThatGameInstance extends GameInstance {
  genericQuestions: ThisOrThatQuestion[];
  manualQuestions: ThisOrThatQuestion[];
  currentQuestion: ThisOrThatQuestion;
  currentVotes: ThisOrThatVote[];

  oldVotes: ThisOrThatVote[];
  seenQuestions: number[];
  viewResults: boolean;
}
