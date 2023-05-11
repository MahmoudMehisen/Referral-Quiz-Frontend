import {Component, OnInit} from '@angular/core';
import {Redeem} from "../../shared/models/redeem.model";
import {QuizAuthService} from "../quiz-auth/quiz-auth.service";
import {HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-redeem-list',
  templateUrl: './redeem-list.component.html',
  styleUrls: ['./redeem-list.component.css']
})
export class RedeemListComponent implements OnInit {
  redeemList: Redeem[] = [];
  isLoading = true;

  constructor(private quizAuthService: QuizAuthService,private http: HttpClient,private toast: ToastrService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.get<Redeem[]>('http://localhost:8080/api/redeem/allRedeems').subscribe(res=>{
      this.redeemList = res;
      this.isLoading = false;
    })
  }

  getRedeem(redeem: Redeem) {
    this.isLoading = true;
    this.http.post('http://localhost:8080/api/redeem/submitRedeem',{
      guestPhone:this.quizAuthService.guest.getValue().phoneNumber,
      redeemId:redeem.id
    }).subscribe(res=>{
      this.isLoading = false;
      // @ts-ignore
      this.toast.success(res.message,"Success");
      // refresh
      this.quizAuthService.loginUsingPhone(this.quizAuthService.guest.getValue().phoneNumber);
    },error => {
      // @ts-ignore
      this.toast.error(res.message,"Error");
    })
  }
}
