import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { faSignInAlt,faClipboard,faCalendarCheck,faBars,faUserCircle,faBell} from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from './activity.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Store';

  faSignInAlt = faSignInAlt;
  faClipboard = faClipboard;
  faCalendarCheck = faCalendarCheck;
  faBars = faBars;
  faUserCircle = faUserCircle;
  faBell = faBell;
  
  username;
  activities;
  timeArray;
  now;

  constructor(private us:UserService,private rt:Router,private as:ActivityService,private toastr: ToastrService){}

  ngOnInit()
  {
    this.us.getUser().subscribe(
      res => {
        this.username = res;
      }
    )

    this.as.getRemainderActivities().subscribe(
      res=> {
        this.activities = res;
        this.callRemainder();
      }
    );
    
  }

  callRemainder()
  {
    this.as.getRemainders(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.activities = res["activities"];
          this.now = Date();
          this.activities.forEach(activity => {
            var date = new Date(activity.time);
            var a = moment(this.now);
            var b = moment(date);

            var diff = b.diff(a);
            
           if(diff>0)
           {
              setTimeout(()=>{
                this.toastinfo("Reminder",activity);
              },diff)
           }
            
          });
          
        }
        else{
          if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
          {
            this.toastwarning("Dashboard Page",res["message"]);
            setTimeout(()=>this.gotologin(),2500);
          }
          else{
            this.toasterror("Dashboard Page",res["message"]);
          }
        }
          
      }
    )
  }

  logout()
  {
    localStorage.clear();
    this.us.setUser(undefined);
    this.rt.navigateByUrl("/forms/login");
  }

  gotologin()
  {
    this.rt.navigateByUrl("/forms/login");
  }

  toastinfo(heading,message)
  {
    this.toastr.info(message.title + " - " + message.activity + " - " + moment(message.time).format('lll'),heading,{timeOut : 8000});
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
