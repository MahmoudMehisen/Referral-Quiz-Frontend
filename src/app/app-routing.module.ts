import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminAuthComponent} from "./admin/admin-auth/admin-auth.component";
import {AdminGuard} from "./admin/admin-auth/admin-guard";
import {AdminHomeComponent} from "./admin/admin-home/admin-home.component";
import {AddQuestionComponent} from "./admin/admin-home/add-question/add-question.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'auth', component: AdminAuthComponent},
      {
        path: 'home', component: AdminHomeComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
