import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminHomeService} from "./admin-home.service";
import {AdminAuthService} from "../admin-auth/admin-auth.service";
import {Subscription} from "rxjs";
import {Question} from "../../shared/models/question.model";
import {QuizMetadata} from "../../shared/models/quiz-metadata.model";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {GenerateReferralComponent} from "./generate-referral/generate-referral.component";

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

  constructor(private adminHomeService:AdminHomeService,private adminAuthService:AdminAuthService,private addDialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSubscription = this.adminHomeService.isDataLoading.subscribe(isLoading=>{
      this.isLoading = isLoading;
      this.quizMetaData = this.adminHomeService.metadata;
      this.questionsList = this.adminHomeService.questionsList;
    });
    this.adminHomeService.fetchAdminHomeData();
  }
  onSave(form: NgForm){
    if(!form.valid){
      return;
    }
    const metadata = form.value as QuizMetadata;
    this.isLoading = true;
    this.adminHomeService.updateMetadata(metadata);
  }
  onLogout(){
    this.adminAuthService.logout();
  }
  onAddQuestion(){
   this.addDialog.open(AddQuestionComponent);
  }

  onGenerateReferral(){
    this.addDialog.open(GenerateReferralComponent);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
