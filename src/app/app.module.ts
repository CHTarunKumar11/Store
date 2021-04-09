import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthorizationService } from './authorization.service';
import { FormsComponent } from './forms/forms.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './search.pipe';
import { RemaindersComponent } from './remainders/remainders.component';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotpwdComponent,
    FormsComponent,
    SearchPipe,
    RemaindersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut : 2000,
        progressBar : true,
        progressAnimation : 'increasing',
        closeButton : true,
        positionClass : "toast-top-center",
        preventDuplicates : true
      }
    ),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
