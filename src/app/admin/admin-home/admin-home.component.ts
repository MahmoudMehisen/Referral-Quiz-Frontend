import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminHomeService} from "./admin-home.service";
import {AdminAuthService} from "../admin-auth/admin-auth.service";
import {Subscription} from "rxjs";
import {Question} from "../../shared/models/question.model";
import {QuizMetadata} from "../../shared/models/quiz-metadata.model";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit, OnDestroy{

  isLoading = false;
  questionsList:Question[]  = [];
  isExpanded = false;
  // @ts-ignore
  quizMetaData:QuizMetadata;
  dataSubscription = new Subscription()

  constructor(private adminHomeService:AdminHomeService,private adminAuthService:AdminAuthService) {
  }

  ngOnInit() {
    this.dataSubscription = this.adminHomeService.isDataLoading.subscribe(isLoading=>{
      this.isLoading = isLoading;
      this.quizMetaData = this.adminHomeService.metadata;
      console.log(this.quizMetaData);
      this.questionsList = this.adminHomeService.questionsList;
    });
    this.adminHomeService.fetchAdminHomeData();
  }
  onLogout(){
    this.adminAuthService.logout();
  }

  toggleList(){
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded)
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
