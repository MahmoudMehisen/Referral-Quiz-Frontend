import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminAuthService} from "./admin-auth/admin-auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  implements OnInit,OnDestroy {

  // @ts-ignore
  subscription: Subscription;

  constructor(private adminAuthService:AdminAuthService,private router:Router) { }

  ngOnInit() {
    this.subscription = this.adminAuthService.admin.subscribe(user=>{
      if(!user){
        this.router.navigate(['/admin/auth'])
      }else{
        this.router.navigate(['/admin/home']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
