import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { faUserTie,faKey } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faUserTie = faUserTie;
  faKey = faKey;

  registerForm:FormGroup;
  submitted = false;

  constructor(private us:UserService,private rt:Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup(
      {
        firstname : new FormControl(null,Validators.required),
        lastname : new FormControl(null,Validators.required),
        username : new FormControl(null,Validators.required),
        password : new FormControl(null,[Validators.required,Validators.minLength(4)]),
      }
    )

  }

  gc()
  {
    return this.registerForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if(this.registerForm.valid)
    {
      let userObj = this.registerForm.value;
      userObj.userid =  Date.now().toString();
      
      this.us.registerUser(userObj).subscribe(
        res=>{
          if(res["message"] == "success")
          {
            this.toastsuccess("Register Page","Registration successfull");
            setTimeout(()=>this.rt.navigateByUrl("/forms/login"),2500);
          }
          else
          {
            this.toastwarning("Register Page",res["message"]);
          }
          
          
        },
        err => {
          console.log(err);
          this.toasterror("Register Page","Something went Wrong...Try again...");
        }
  
      )
    }
    
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
