import {Injectable} from "@angular/core";
import {Question} from "../../shared/models/question.model";
import {Subject, lastValueFrom, forkJoin} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminAuthService} from "../admin-auth/admin-auth.service";
import {QuizMetadata} from "../../shared/models/quiz-metadata.model";


@Injectable({providedIn: 'root'})
export class AdminHomeService {

  // @ts-ignore
  questionsList: Subject<Question[]>;

  constructor(private http: HttpClient) {
  }

  fetchAdminHomeData() {

    const requests = [
      this.fetchQuestionsList(),
      this.fetchQuizMetadata()
    ];

    forkJoin(requests).subscribe(results => {
      console.log('done')
    });

  }


  private async fetchQuestionsList() {
    await lastValueFrom(this.http.get<Question[]>('http://localhost:8080/api/admin/allQuestions'))
      .then((value) => {
        console.log(value);
      });
  }

  private async fetchQuizMetadata() {
    await lastValueFrom(this.http.get<QuizMetadata>('http://localhost:8080/api/admin/metadata'))
      .then((value) => {
        console.log(value);
      });
  }
}
