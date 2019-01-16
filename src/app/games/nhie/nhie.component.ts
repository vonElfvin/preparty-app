import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhieGameInstanceService } from './shared/nhie-game-instance.service';
import { NhieGameInstance } from './shared/nhie-game-instance';
import { FeedbackService } from '../../core/feedback/feedback.service';
import { FeedbackMessage, FeedbackType } from '../../core/feedback/feedback.model';
import { PartyService } from '../../party/shared/party.service';
import {Observable, Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NhieQuestion } from './shared/nhie';
import { NhieQuestionService } from './shared/nhie-question.service';
import { take } from 'rxjs/operators';
import {MenuService} from '../../party/shared/menu.service';

@Component({
  selector: 'app-nhie',
  templateUrl: './nhie.component.html',
  styleUrls: ['./nhie.component.scss']
})
export class NhieComponent implements OnInit, OnDestroy {

  gameInstance: NhieGameInstance;
  currentQuestion: NhieQuestion;

  isGameLeader: Observable<boolean>;

  showAddQuestion = false;

  gameSub: Subscription;

  newQuestionLoading = true;

  isloadingMoreQuestions = false;

  constructor(
    private nhieGameInstanceService: NhieGameInstanceService,
    private nhieQuestionService: NhieQuestionService,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private partyService: PartyService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.isGameLeader = this.partyService.isGameLeaderObservable;
    this.menuService.setMenuVisibility(true);
    this.gameSub = this.nhieGameInstanceService.getGameInstance().subscribe(gameInstance => {
      if (gameInstance) {
        this.gameInstance = gameInstance;
        this.currentQuestion = gameInstance.currentQuestion;
      } else {
        this.nhieGameInstanceService.generateNewGameInstance();
      }
    });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }

  setNextQuestion() {
    // Select manual question with 70% probability
    if (this.gameInstance.manualQuestions.length > 0 && Math.floor(Math.random() * Math.floor(100)) <= 70) {
      this.gameInstance.currentQuestion = this.gameInstance.manualQuestions.shift();
    } else {
      if (this.gameInstance.genericQuestions.length > 0) {
        const currentQuestion: NhieQuestion = this.gameInstance.genericQuestions.shift();
        this.gameInstance.currentQuestion = currentQuestion;
        this.gameInstance.seenQuestions.push(currentQuestion.index);
      }
      if (this.gameInstance.seenQuestions.length === this.nhieQuestionService.nQuestions) {
        this.gameInstance.seenQuestions = [];
      }
    }

    // Add more generic if empty
    if (this.gameInstance.genericQuestions.length <= 1) {
      this.addQuestions();
    }
    this.nhieGameInstanceService.updateGameInstance(this.gameInstance);
  }

  addQuestions() {
    this.nhieGameInstanceService.getGameInstanceQuestions(this.gameInstance.seenQuestions).pipe(
      take(1)
    )
      .subscribe(questions => {
        this.gameInstance.genericQuestions = this.gameInstance.genericQuestions.concat(questions);
      });
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

  addManualQuestionClick() {
    this.showAddQuestion = !this.showAddQuestion;
    this.menuService.setHideAll(true);
  }
}
