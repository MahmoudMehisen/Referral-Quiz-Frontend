import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminHomeService} from "../admin-home.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  question = {
    questionText: '',
    options: ['', '', '', '']
  };

  isLoading = false;
  isAddedSuccessfully = false;

  constructor(private adminHomeService: AdminHomeService) {
  }

  ngOnInit() {
    this.isLoading = false;
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.isAddedSuccessfully = false;
      this.adminHomeService.addNewQuestion(this.question.questionText, this.question.options).subscribe(res => {
        this.isLoading = false;
        this.question = {
          questionText: '',
          options: ['', '', '', '']
        };
        this.isAddedSuccessfully = true;
      },error => {
        console.log(error);
      });
    }
  }
}
