import {Injectable} from "@angular/core";
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AdminAuthService} from "../admin-auth/admin-auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private adminAuthService: AdminAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.adminAuthService.admin.pipe(
      take(1),
      exhaustMap(admin => {
        if (!admin) {
          return next.handle(req);
        }
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + admin.token,
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin':'*'
        });
        const modifiedReq = req.clone({
          headers: headers
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
