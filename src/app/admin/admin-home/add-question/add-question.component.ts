import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AdminHomeService } from "../admin-home.service";
import { Question } from "../../../shared/models/question.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {


  // @ts-ignore


  questionData = {
    questionText: '',
    options: [
      { optionText: '', isTheAnswer: true },
      { optionText: '', isTheAnswer: false },
      { optionText: '', isTheAnswer: false },
      { optionText: '', isTheAnswer: false },
    ]
  };
  selectedIndex = 0;
  isLoading = false;
  isAddedSuccessfully = false;

  constructor(private adminHomeService: AdminHomeService, @Inject(MAT_DIALOG_DATA) public data: {
    question: Question,
    isEditMode: boolean,
    index: number,
  }) {
  }

  onSelectionChange(event: MatRadioChange) {
    if (event.value) {
      //this.questionData.options[this.selectedIndex].isTheAnswer = false;
      console.log(event.value);
      //this.selectedIndex = event.value;
      //this.questionData.options[this.selectedIndex].isTheAnswer = true;
    }
  }

  ngOnInit() {
    this.isLoading = false;
    if (this.data != null && this.data.isEditMode) {
      this.questionData.questionText = this.data.question.questionText;
      this.questionData.options = this.data.question.options.map(val => {
        return { optionText: val.optionText, isTheAnswer: val.isCorrectAnswer };
      });
    }
  }

  async submit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.isAddedSuccessfully = false;

      if (this.data != null && this.data.isEditMode) {
        this.data.question.questionText = this.questionData.questionText;

        this.questionData.options.forEach((value, index) => {
          this.data.question.options[index].optionText = value.optionText;
          this.data.question.options[index].isCorrectAnswer = value.isTheAnswer;
        })
        console.log(this.data.question.options);
        

        await this.adminHomeService.updateQuestion(this.data.index, this.data.question);

        this.isLoading = false;
        this.isAddedSuccessfully = true;
      } else {


        this.adminHomeService.addNewQuestion(this.questionData.questionText, this.questionData.options).subscribe(res => {
          this.isLoading = false;
          this.questionData = {
            questionText: '',
            options: [
              { optionText: '', isTheAnswer: true },
              { optionText: '', isTheAnswer: false },
              { optionText: '', isTheAnswer: false },
              { optionText: '', isTheAnswer: false },
            ]
          };
          this.selectedIndex = 0;
          this.isAddedSuccessfully = true;
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
