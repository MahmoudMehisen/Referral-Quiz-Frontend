import {Injectable} from "@angular/core";
import {Question} from "../../shared/models/question.model";
import {Subject, lastValueFrom, forkJoin} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminAuthService} from "../admin-auth/admin-auth.service";
import {QuizMetadata} from "../../shared/models/quiz-metadata.model";


@Injectable({providedIn: 'root'})
export class AdminHomeService {

  // @ts-ignore
  questionsList: Question[];
  // @ts-ignore
  metadata: QuizMetadata;

  // @ts-ignore
  isDataLoading = new Subject<boolean>(true);

  constructor(private http: HttpClient) {
  }

  async fetchAdminHomeData() {
    this.isDataLoading.next(true);
    const requests = [
      this.fetchQuestionsList(),
      this.fetchQuizMetadata()
    ];
    forkJoin(requests).subscribe(results => {

      this.questionsList = results[0] as Question[];
      this.metadata = results[1] as QuizMetadata;

      this.isDataLoading.next(false);
      console.log(results)
    });
  }


  private async fetchQuestionsList(): Promise<Question[]> {
    return await lastValueFrom(this.http.get<Question[]>('http://localhost:8080/api/admin/allQuestions'));
  }

  private async fetchQuizMetadata(): Promise<QuizMetadata> {
    return await lastValueFrom(this.http.get<QuizMetadata>('http://localhost:8080/api/admin/metadata'));
  }
}
