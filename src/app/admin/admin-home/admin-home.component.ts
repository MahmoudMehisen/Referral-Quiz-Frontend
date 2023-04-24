import {Component, OnInit} from '@angular/core';
import {AdminHomeService} from "./admin-home.service";
import {AdminAuthService} from "../admin-auth/admin-auth.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{


  constructor(private adminHomeService:AdminHomeService,private adminAuthService:AdminAuthService) {
  }

  ngOnInit() {
    this.adminHomeService.fetchAdminHomeData();
  }
  onLogout(){
    this.adminAuthService.logout();
  }
}
