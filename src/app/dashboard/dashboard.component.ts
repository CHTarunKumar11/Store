import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { faTrash,faPencilAlt,faStopwatch,faSave,faTimes,faPlusCircle,faStickyNote,faSearch,faBell,faClock,faThumbtack,faLeaf} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
  faThumbtack = faThumbtack;
  faLeaf = faLeaf;

  pinnedActivities;
  pinnedLength = 0;
  activityLength = 0;
  searchTerm;
  activities;
  flag = false;
  date;
  username = localStorage.getItem("username");
  editactivityObj = {"username":"","id":"","title":"","activity":"","time":"","pin":false};
  addactivityObj = {"username":"","id":"","title":"","activity":"","time":"","pin":false};

  constructor(private as:ActivityService,private rt:Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getActivities();
    this.getPinnedActivities();
    
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
          this.addactivityObj.pin = false;
          this.as.setRemainders(this.username);
          this.getActivities();
          this.getPinnedActivities();
        }
      },
      err => {
        console.log(err);
        this.toasterror("Dashboard Page","Something went Wrong...Try again...");
      }
    )
    
  }

  getPinnedActivities()
  {
    this.as.getPinnedActivities(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.pinnedActivities = res["activities"];
          this.pinnedLength = this.pinnedActivities.length;
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

  getActivities()
  {
    this.as.getActivities(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.activities = res["activities"];
          this.activityLength = this.activities.length
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
          location.reload();
          this.as.setRemainders(this.username);
          this.getActivities();
          this.getPinnedActivities();
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
          this.getPinnedActivities();
        }
      }
    )
  }

  pinActivity(activity)
  {
    console.log(activity);
    activity.pin = !activity.pin;
    this.as.updateActivity(activity).subscribe(
      res=>{
          this.getActivities();
          this.getPinnedActivities();
      }
    ) 
  }

  gotoModal(activity)
  {
    this.editactivityObj.id = activity.id;
    this.editactivityObj.title = activity.title;
    this.editactivityObj.activity = activity.activity;
    this.editactivityObj.time = activity.time;
    this.editactivityObj.pin = activity.pin;
  }

  gotologin()
  {
    this.rt.navigateByUrl("/forms/login");
  }

  remindModal()
  {
    this.flag = true;
  }

  async setReminder()
  {
    if(!this.flag)
    {
      this.date = new Date(this.editactivityObj.time);
      await this.save();
      this.as.setRemainders(this.username);
    }
    else
    {
      this.addactivityObj.time = this.editactivityObj.time;
      this.flag = false;
    }
    this.editactivityObj.time="";
  }

  async deleteReminder(activity)
  {
    activity.time = "";
    await this.as.updateActivity(activity).subscribe(
       res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.getActivities();
          this.getPinnedActivities();
          location.reload();
          this.as.setRemainders(this.username);
        }
      }
    )
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
