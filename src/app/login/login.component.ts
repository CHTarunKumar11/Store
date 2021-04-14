import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { faUserTie,faKey } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUserTie = faUserTie;
  faKey = faKey;

  loginForm:FormGroup;
  submitted = false;

  constructor(private us:UserService,private rt:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({

      username: new FormControl(null,Validators.required),
      password: new FormControl(null,[Validators.required,Validators.minLength(4)]),

    });
  }

  onSubmit()
  {
    this.submitted=true;
    if(this.loginForm.valid)
    {
      let credObj = this.loginForm.value;
      this.us.loginUser(credObj).subscribe(
        res=>{
          if(res["message"] == "success")
          {
            localStorage.setItem("token",res["signedToken"]);
            localStorage.setItem("username",res["username"]);
            localStorage.setItem("userid",res["userid"]);
            let username = localStorage.getItem("username");
            this.us.setUser(username);
            this.toastsuccess("Login Page","Login successfull");
            setTimeout(()=>this.rt.navigateByUrl("/dashboard"),2500);
            
          }
          else{
            this.toastwarning("Login Page",res["message"]);
          }
        },
        err => {
          console.log(err);
          this.toasterror("Login Page","Something went Wrong...Try again...");
        }
      )
    }
  }

  gc()
  {
    return this.loginForm.controls;
  }

  forgot()
  {
    this.rt.navigateByUrl("/forms/forgotpwd");
  }

  toastsuccess(heading,message)
  {
    this.toastr.success(message,heading);
  }

  toasterror(heading,message)
  {
    this.toastr.error(message,heading);
  }

  toastwarning(heading,message)
  {
    this.toastr.warning(message,heading);
  }

  

}


