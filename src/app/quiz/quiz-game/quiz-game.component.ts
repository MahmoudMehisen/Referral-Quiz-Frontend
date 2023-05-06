import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuizGameService} from "./quiz-game.service";
import {Question} from "../../shared/models/question.model";
import {Answer} from "../../shared/models/answer.model";
import {QuizAuthService} from "../quiz-auth/quiz-auth.service";

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent implements OnInit, OnDestroy {

  // @ts-ignore
  subscription: Subscription;
  isLoading = true;

  questions: Question[] = [];

  answers: Answer[] = [];

  canSubmit = false;
  constructor(private quizGameService: QuizGameService,private quizAuthService:QuizAuthService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.quizGameService.isDataLoading.subscribe(res => {
      this.isLoading = res;
      this.questions = this.quizGameService.questionsList;
      this.canSubmit = false;
    })
    this.quizGameService.startGame(this.quizAuthService.guest.getValue().phoneNumber);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectAnswer(questionId: number, optionId: number) {
    const answer = this.answers.find(ans => ans.questionId === questionId);
    if (answer) {
      answer.optionId = optionId;
    } else {
      this.answers.push(new Answer(questionId, optionId));
    }
    if(this.answers.length === this.questions.length){
      this.canSubmit = true;
    }
  }

  submitAnswers() {
    console.log(this.answers)
  }
}
