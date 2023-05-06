import {Component, OnDestroy, OnInit} from '@angular/core';
import {Guest} from "../../shared/models/guest.model";
import {Subscription} from "rxjs";
import {QuizAuthService} from "../quiz-auth/quiz-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css']
})
export class QuizHomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  // @ts-ignore
  guest: Guest;
  // @ts-ignore
  subscription: Subscription;
  email = '';

  constructor(private quizAuthService: QuizAuthService, private router: Router) {
  }

  ngOnInit() {
    this.guest = this.quizAuthService.guest.getValue();
    this.subscription = this.quizAuthService.guest.subscribe(res => {
      this.isLoading = false;
      this.guest = res;
    })
  }

  playGame() {
    this.router.navigate(['/quiz/game'],{replaceUrl:true})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateEmail() {
    if (this.email.length > 0) {
      this.isLoading = true;
      this.quizAuthService.updateGuest(this.guest.phoneNumber, this.email)
    }

  }

  logout() {
    this.quizAuthService.logout();
  }
}
