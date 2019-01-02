import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhieGameInstanceService } from './shared/nhie-game-instance.service';
import { NhieGameInstance } from './shared/nhie-game-instance';
import { FeedbackService } from '../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../core/feedback/feedback.model';
import { PartyService } from '../../party/shared/party.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NhieQuestion } from './shared/nhie';
import { NhieQuestionService } from './shared/nhie-question.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nhie',
  templateUrl: './nhie.component.html',
  styleUrls: ['./nhie.component.scss']
})
export class NhieComponent implements OnInit, OnDestroy {

  gameInstance: NhieGameInstance;
  currentQuestion: NhieQuestion;
  subscription: Subscription;

  isGameLeader: Observable<boolean>;

  showAddQuestion = false;

  currentPlayer: string;

  constructor(
    private nhieGameInstanceService: NhieGameInstanceService,
    private nhieQuestionService: NhieQuestionService,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private partyService: PartyService,
  ) { }

  ngOnInit() {
    this.isGameLeader = this.partyService.isGameLeaderObservable;
    const joinCode = this.route.snapshot.params['joinCode'];
    if (joinCode) {
      this.subscription = this.nhieGameInstanceService.getGameInstanceByJoinCode(joinCode).subscribe(gameInstance => {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      this.nhieGameInstanceService.getGameInstanceQuestions(this.gameInstance.seenQuestions).pipe(
        take(1)
      )
        .subscribe(questions => {
          this.gameInstance.genericQuestions = this.gameInstance.genericQuestions.concat(questions);
      });
    }

    // Update the game instance in DB
    this.nhieGameInstanceService.updateGameInstance(this.gameInstance);
  }

  submitNewManualQuestion(newManualQuestion: string) {
    const newQuestion: NhieQuestion = {
      question: newManualQuestion
    };
    this.gameInstance.manualQuestions.push(newQuestion);
    this.nhieGameInstanceService.updateGameInstance(this.gameInstance).then(() => {
    });
    this.showAddQuestion = false;
    this.feedbackService.message(FeedbackMessage.QuestionSuccess, FeedbackType.Primary);
  }
}
