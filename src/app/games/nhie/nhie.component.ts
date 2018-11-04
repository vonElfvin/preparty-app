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

  showAddquestion = false;

  newManualQuestion: string;

  currentPlayer: string;
  currentQuestion: string;

  constructor(private nhieService: NhieGameInstanceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const joinCode = this.route.snapshot.params['id'];
    if (joinCode) {
      this.nhieService.getGameInstanceByJoinCode(joinCode).subscribe(res => {
        this.gameInstance = res;
        this.currentQuestion = res.currentQuestion;
        console.log(res);
      });
    }
  }

  setNextQuestion() {
    // Select manual question with 70% probability
    if (this.gameInstance.manualQuestions.length > 0 && Math.floor(Math.random() * Math.floor(100)) <= 70) {
      this.gameInstance.currentQuestion = this.gameInstance.manualQuestions.shift();
    } else {
      this.gameInstance.currentQuestion = this.gameInstance.genericQuestions.shift();
    }
    // Add more generic if empty
    if (this.gameInstance.genericQuestions.length === 0) {
      this.gameInstance.genericQuestions = this.gameInstance.genericQuestions.concat(this.nhieService.getGameInstanceQuestions());
    }
    // Update the game instance in DB
    this.nhieService.updateGameInstance(this.gameInstance).then(res => {

    });
  }

  addManualQuestion() {
    this.showAddquestion = true;

  }

  onAnswer($event: boolean) {
    this.setNextQuestion();
  }
}
