import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RemaindersComponent } from './remainders/remainders.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [

  {path:"",redirectTo:"/forms/login",pathMatch:"full"},
  {path:"forms",redirectTo:"/forms/login",pathMatch:"full"},
  {path:"forms",component:FormsComponent,children:[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"forgotpwd",component:ForgotpwdComponent},
  ]},
  {path:"dashboard",component:DashboardComponent,canActivate:[RouteGuard]},
  {path:"remainders",component:RemaindersComponent,canActivate:[RouteGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
