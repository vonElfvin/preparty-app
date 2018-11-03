import { Component, OnInit } from '@angular/core';
import {NhieGameInstanceService} from './shared/nhieGameInstance.service';
import {ActivatedRoute} from '@angular/router';
import {NhieGameInstance} from './shared/nhie-game-instance';

@Component({
  selector: 'app-nhie',
  templateUrl: './nhie.component.html',
  styleUrls: ['./nhie.component.scss']
})
export class NhieComponent implements OnInit {


  gameInstance: NhieGameInstance;
  gameQuestions: string[];
  players = ['Jan', 'Anita', 'Bengt'];

  currentPlayer: string;
  currentQuestion: string;

  constructor(private nhieService: NhieGameInstanceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const joinCode = this.route.snapshot.params['id'];
    if (joinCode) {
      this.nhieService.getGameInstanceByJoinCode(joinCode).subscribe(res => {
        this.gameInstance = res;
      });
    }
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
