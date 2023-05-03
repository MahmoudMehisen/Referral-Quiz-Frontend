import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminHomeService} from "../admin-home.service";
import {Question} from "../../../shared/models/question.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {


  // @ts-ignore


  questionData = {
    questionText: '',
    options: ['', '', '', '']
  };

  isLoading = false;
  isAddedSuccessfully = false;


  constructor(private adminHomeService: AdminHomeService, @Inject(MAT_DIALOG_DATA) public data: {
    question: Question,
    isEditMode: boolean,
    index: number,
  }) {
  }

  ngOnInit() {
    this.isLoading = false;
    if (this.data.isEditMode) {
      this.questionData.questionText = this.data.question.questionText;
      this.questionData.options = this.data.question.options.map(val => val.optionText);
    }
  }

 async submit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.isAddedSuccessfully = false;

      if (this.data.isEditMode) {
        this.data.question.questionText = this.questionData.questionText;
        this.questionData.options.forEach((value, index) => {
          this.data.question.options[index].optionText = value;
        })
        console.log(this.data.question.options)
       await this.adminHomeService.updateQuestion(this.data.index, this.data.question);
        this.isLoading = false;
        this.isAddedSuccessfully = true;
      } else {
        this.adminHomeService.addNewQuestion(this.questionData.questionText, this.questionData.options).subscribe(res => {
          this.isLoading = false;
          this.questionData = {
            questionText: '',
            options: ['', '', '', '']
          };
          this.isAddedSuccessfully = true;
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
