import { Component, OnInit } from '@angular/core';
import {NhieService} from './shared/nhie.service';

@Component({
  selector: 'app-nhie',
  templateUrl: './nhie.component.html',
  styleUrls: ['./nhie.component.scss']
})
export class NhieComponent implements OnInit {

  gameQuestions: string[];
  players = ['Jan', 'Anita', 'Bengt'];

  currentPlayer: string;
  currentQuestion: string;

  constructor(private nhieService: NhieService) { }

  ngOnInit() {
    this.gameQuestions = this.nhieService.getGameInstanceQuestions();

    this.rotatePlayerQueue();
    this.setNextQuestion();
  }


  rotatePlayerQueue() {
    this.currentPlayer = this.players.shift();
    this.players.push(this.currentPlayer);
  }

  setNextQuestion() {
    this.currentQuestion = this.gameQuestions.pop();
  }

  onAnswer($event: boolean) {
    this.setNextQuestion();
    this.rotatePlayerQueue();
  }
}
