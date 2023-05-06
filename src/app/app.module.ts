import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from "./welcome/welcome.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {AdminComponent} from './admin/admin.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminAuthComponent} from './admin/admin-auth/admin-auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {QuestionComponent} from './admin/admin-home/question/question.component';
import {AuthInterceptorService} from "./admin/admin-auth/admin-interceptor.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AddQuestionComponent} from './admin/admin-home/add-question/add-question.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpResponseInterceptor} from "./admin/admin-home/response-interceptor";
import {MatRadioModule} from '@angular/material/radio';
import { GenerateReferralComponent } from './admin/admin-home/generate-referral/generate-referral.component';
import { InvitationComponent } from './invitation/invitation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizHomeComponent } from './quiz/quiz-home/quiz-home.component';
import { QuizAuthComponent } from './quiz/quiz-auth/quiz-auth.component';
import { QuizGameComponent } from './quiz/quiz-game/quiz-game.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminComponent,
    AdminAuthComponent,
    LoadingSpinnerComponent,
    AdminHomeComponent,
    QuestionComponent,
    AddQuestionComponent,
    GenerateReferralComponent,
    InvitationComponent,
    PagenotfoundComponent,
    QuizComponent,
    QuizHomeComponent,
    QuizAuthComponent,
    QuizGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
