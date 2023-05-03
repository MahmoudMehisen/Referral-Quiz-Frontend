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

   fetchAdminHomeData() {
    this.isDataLoading.next(true);
    const requests = [
      this.fetchQuestionsList(),
      this.fetchQuizMetadata()
    ];

    forkJoin(requests).subscribe(results => {

      this.questionsList = results[0] as Question[];
      this.metadata = results[1] as QuizMetadata;
      this.isDataLoading.next(false);
    });

     this.http.get('http://localhost:8080/api/admin/allQuestions').subscribe(res=>{
       console.log(res);
     })
  }

  addNewQuestion(question:string, options:string[]){
    return this.http.post('http://localhost:8080/api/admin/addQuestion',{
      questionText:question,
      questionOptions:options
    })
  }

  updateQuestion(index:number,question:Question){
    return this.http.put('http://localhost:8080/api/admin/updateQuestion',{
      id:question.id,
      questionText:question.questionText,
      options:question.options
    }).subscribe(res=>{
      console.log(res);
      this.questionsList[index] = question;
      this.isDataLoading.next(false);
    },error => {
      console.log(error);
      this.isDataLoading.next(false);
    });
  }
  deleteQuestion(index:number,question:Question){
    return this.http.delete('http://localhost:8080/api/admin/deleteQuestion/' + question.id).subscribe(res=>{
      console.log(res);
      this.questionsList.splice(index,1);
      this.isDataLoading.next(false);
    },error => {
      console.log(error);
      this.isDataLoading.next(false);
    });
  }

  updateMetadata(newMetadata: QuizMetadata){
    this.isDataLoading.next(true);
    return this.http.put<QuizMetadata>('http://localhost:8080/api/admin/updateMetadata',newMetadata).subscribe(res=>{
      this.metadata = res;
      this.isDataLoading.next(false);
    });
  }

  private async fetchQuestionsList(): Promise<Question[]> {
    return await lastValueFrom(this.http.get<Question[]>('http://localhost:8080/api/admin/allQuestions'));
  }

  private async fetchQuizMetadata(): Promise<QuizMetadata> {
    return await lastValueFrom(this.http.get<QuizMetadata>('http://localhost:8080/api/admin/metadata'));
  }
}
