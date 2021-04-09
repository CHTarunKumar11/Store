import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { faTrash,faPencilAlt,faStopwatch,faSave,faTimes,faPlusCircle,faStickyNote,faSearch,faBell,faClock} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-remainders',
  templateUrl: './remainders.component.html',
  styleUrls: ['./remainders.component.css']
})
export class RemaindersComponent implements OnInit {

  
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faStopwatch = faStopwatch;
  faSave = faSave;
  faTimes = faTimes;
  faPlus = faPlusCircle;
  faStickyNote = faStickyNote;
  faSearch = faSearch;
  faBell = faBell;
  faClock = faClock;

  searchTerm;
  activities;
  flag = false;
  date;
  username = localStorage.getItem("username");
  editactivityObj = {"username":"","id":"","title":"","activity":"","time":""};
  addactivityObj = {"username":"","id":"","title":"","activity":"","time":""};

  constructor(private as:ActivityService,private rt:Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getActivities();

  }

  transform()
  {
    document.getElementById("t1").style.display = "none";
    document.getElementById("t2").style.display = "block";
  }

  close()
  {
    document.getElementById("t1").style.display = "block";
    document.getElementById("t2").style.display = "none";
  }

  add()
  {
    this.close();
    let id = Date.now().toString();
    this.addactivityObj.username = this.username;
    this.addactivityObj.id = id;
    
    this.as.addActivity(this.addactivityObj).subscribe(
      res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.addactivityObj.title = "";
          this.addactivityObj.activity = "";
          this.addactivityObj.time = "";
          this.getActivities();
        }
      },
      err => {
        console.log(err);
        this.toasterror("Dashboard Page","Something went Wrong...Try again...");
      }
    )
    
  }

  getActivities()
  {
    this.as.getRemainders(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.activities = res["activities"];
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

  delete(id)
  {
    this.as.deleteActivity(id).subscribe(
      res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.getActivities();
        }
      }
    )
  }

  
  save()
  {
    this.as.updateActivity(this.editactivityObj).subscribe(
      res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.getActivities();
        }
      }
    )
  }

  gotoModal(activity)
  {
    this.editactivityObj.id = activity.id;
    this.editactivityObj.title = activity.title;
    this.editactivityObj.activity = activity.activity;
    this.editactivityObj.time = activity.time;
  }

  gotologin()
  {
    this.rt.navigateByUrl("/forms/login");
  }

  remindModal()
  {
    this.flag = true;
  }

  setReminder()
  {
    if(this.flag == false)
    {
      
      this.date = new Date(this.editactivityObj.time);
      this.save();
    }
    else
    {
      this.addactivityObj.time = this.editactivityObj.time;
      this.flag = false;
    }
    this.editactivityObj.time="";
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
