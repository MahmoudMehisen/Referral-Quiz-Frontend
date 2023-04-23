import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, BehaviorSubject, tap, throwError} from "rxjs";
import {Admin} from "./admin.model";

export interface AdminData {
  id: number;
  token: string;
  username: string;
  email: string;
}

@Injectable({providedIn: 'root'})
export class AdminAuthService {

  // @ts-ignore
  admin = new BehaviorSubject<Admin>(null)

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<AdminData>('http://localhost:8080/api/auth/login', {
      username: username,
      password: password,
    }).pipe(catchError(this.handelError), tap(resData => {
      this.handelAuth(resData.id, resData.email, resData.token);
    }));
  }

  private handelAuth(userId: number, email: string, token: string) {
    const admin = new Admin(userId, email, token);

    this.admin.next(admin);
  }

  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid'
        break;
    }
    return throwError(() => errorMessage);
  }
}
