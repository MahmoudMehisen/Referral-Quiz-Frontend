import {Injectable} from "@angular/core";
import {Question} from "../../shared/models/question.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Guest} from "../../shared/models/guest.model";
import {Answer} from "../../shared/models/answer.model";
import {QuizAuthService} from "../quiz-auth/quiz-auth.service";
import { ReferralTokenModel } from "src/app/shared/models/referral-token.model";

@Injectable({providedIn: 'root'})
export class QuizGameService {

  questionsList: Question[] = [];

  // @ts-ignore
  isDataLoading = new Subject<boolean>(true);


  constructor(private http: HttpClient, private router: Router,private quizAuthService:QuizAuthService) {
  }

  startGame(phone: string) {
    this.isDataLoading.next(true);

    this.http.post<Question[]>('http://localhost:8080/api/quiz/startQuiz/' + phone, {}).subscribe(res => {
      this.questionsList = res;
      console.log(res);
      this.isDataLoading.next(false);
    }, error => {
      this.isDataLoading.next(false);
      this.questionsList = [];
    });
  }

  submitGame(phone:string, answers:Answer[]){
    this.isDataLoading.next(true);

    this.http.post<Guest>('http://localhost:8080/api/quiz/submitQuiz' , {
      phoneNumber:phone,
      answerQuestionOptionList:answers
    }).subscribe(res => {
      this.quizAuthService.updateWithQuiz(res);
      console.log(res);
      this.isDataLoading.next(false);
    }, error => {
      this.isDataLoading.next(false);
    });
  }

  generateReferralToken(phoneNumber: string) {
    return this.http.post<ReferralTokenModel>('http://localhost:8080/api/quiz/referralAnotherUser', {
      newGuestPhone:phoneNumber,
      currentGuestPhone:this.quizAuthService.guest.getValue().phoneNumber,
    })
  }

}
