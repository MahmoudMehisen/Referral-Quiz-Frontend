import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  implements OnInit {


  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  getEmailErrorMessage() {

  }

  getPasswordErrorMessage() {

  }
}
