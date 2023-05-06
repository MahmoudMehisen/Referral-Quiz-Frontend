import {Injectable} from "@angular/core";
import {Question} from "../../shared/models/question.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Guest} from "../../shared/models/guest.model";

@Injectable({providedIn: 'root'})
export class QuizGameService {

  questionsList: Question[] = [];

  // @ts-ignore
  isDataLoading = new Subject<boolean>(true);


  constructor(private http: HttpClient, private router: Router) {
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

}
