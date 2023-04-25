import {Component, Input} from '@angular/core';
import {Question} from "../../../shared/models/question.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  // @ts-ignore
  @Input() index:number;
  // @ts-ignore
  @Input() question:Question;

}
