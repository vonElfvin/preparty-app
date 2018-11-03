import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NhieService {

  constructor() { }

  getGameInstanceQuestions(): string[] {
    return ['ätit mat', 'fångat fisk', 'kastat sten', 'varit skön',
    'krökat'];
  }


  addQuestionToGame(gameInstanceId: string, question: string) {
    console.log(`gameinstance: ${gameInstanceId} question:${question}`);
  }

}
