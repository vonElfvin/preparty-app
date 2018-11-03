import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NhieService {

  constructor() { }

  getGameInstanceQuestions(): string[] {
    return [' Jag har aldrig ätit mat', 'Jag har aldrig fångat fisk', 'Jag har aldrig kastat sten', 'Jag har aldrig varit skön',
    'Jag har aldrig krökat'];
  }

}
