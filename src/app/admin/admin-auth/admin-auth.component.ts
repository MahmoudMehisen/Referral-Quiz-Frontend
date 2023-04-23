import {Component} from '@angular/core';
import {AdminAuthService} from "./admin-auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AdminAuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    this.authService.login(username, password)
      .subscribe({
        next: resData => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error: errorMessage => {
          this.isLoading = false;
        }
      });

    form.reset();
  }
}
