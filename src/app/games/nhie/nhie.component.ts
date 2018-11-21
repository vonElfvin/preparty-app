import { Component, OnInit } from '@angular/core';
import { NhieGameInstanceService } from './shared/nhie-game-instance.service';
import { NhieGameInstance } from './shared/nhie-game-instance';
import { FeedbackService } from '../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../core/feedback/feedback.model';
import { PartyService } from '../../party/shared/party.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NhieQuestion } from './shared/nhie';
import { NhieQuestionService } from './shared/nhie-question.service';

@Component({
  selector: 'app-nhie',
  templateUrl: './nhie.component.html',
  styleUrls: ['./nhie.component.scss']
})
export class NhieComponent implements OnInit {

  gameInstance: NhieGameInstance;
  currentQuestion: NhieQuestion;

  isGameLeader: Observable<boolean>;

  showAddQuestion = false;

  currentPlayer: string;

  constructor(
    private nhieGameInstanceService: NhieGameInstanceService,
    private nhieQuestionService: NhieQuestionService,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private partyService: PartyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isGameLeader = this.partyService.isGameLeaderObservable;
    const joinCode = this.route.snapshot.params['joinCode'];
    if (joinCode) {
      this.nhieGameInstanceService.getGameInstanceByJoinCode(joinCode).subscribe(gameInstance => {
        console.log(gameInstance);
        if (gameInstance) {
          this.gameInstance = gameInstance;
          this.currentQuestion = gameInstance.currentQuestion;
        } else {
          this.nhieGameInstanceService.generateNewGameInstanceFromCode(joinCode);
        }
      });
    }
  }

  setNextQuestion() {
    // Select manual question with 70% probability
    if (this.gameInstance.manualQuestions.length > 0 && Math.floor(Math.random() * Math.floor(100)) <= 70) {
      this.gameInstance.currentQuestion = this.gameInstance.manualQuestions.shift();
    } else {
      const currentQuestion: NhieQuestion = this.gameInstance.genericQuestions.shift();
      this.gameInstance.currentQuestion = currentQuestion;
      this.gameInstance.seenQuestions.push(currentQuestion.index);
      if (this.gameInstance.seenQuestions.length === this.nhieQuestionService.nQuestions) {
        this.gameInstance.seenQuestions = [];
      }
    }

    // Add more generic if empty
    if (this.gameInstance.genericQuestions.length === 0) {
      this.nhieGameInstanceService.getGameInstanceQuestions(this.gameInstance.seenQuestions)
        .subscribe(questions => {
          this.gameInstance.genericQuestions = this.gameInstance.genericQuestions.concat(questions);
      });
    }

    // Update the game instance in DB
    this.nhieGameInstanceService.updateGameInstance(this.gameInstance);
  }

  submitNewManualQuestion(newManualQuestion: NhieQuestion) {
    this.gameInstance.manualQuestions.push(newManualQuestion);
    this.nhieGameInstanceService.updateGameInstance(this.gameInstance).then(() => {
    });
    this.showAddQuestion = false;
    this.feedbackService.message(FeedbackMessage.QuestionSuccess, FeedbackType.Primary);
  }

  onGameInfoClick() {
    this.router.navigate(['game-info/nhie']);
  }

  onLeaveClick() {

  }
}
