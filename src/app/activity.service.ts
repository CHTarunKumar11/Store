import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  remainders = new BehaviorSubject(null);
  activities;

  constructor(private hc:HttpClient) { }

  async setRemainders(username)
  {
    await this.getRemainders(username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.activities = res["activities"];
          this.remainders.next(this.activities);
        }
      }
    )
  }

  getRemainderActivities()
  {
    return this.remainders.asObservable();
  }

  addActivity(activityObj):Observable<any>
  {
    return this.hc.post("/activity/addactivity",activityObj);
  }
  getActivities(username):Observable<any>
  {
    return this.hc.get("/activity/getactivities/"+username);
  }
  updateActivity(activityObj):Observable<any>
  {
    return this.hc.post("/activity/updateactivity",activityObj);
  }
  deleteActivity(id):Observable<any>
  {
    return this.hc.delete("/activity/deleteactivity/"+id);
  }
  getRemainders(username):Observable<any>
  {
    return this.hc.get("/activity/getremainders/"+username);
  }
  getPinnedActivities(username):Observable<any>
  {
    return this.hc.get("/activity/getpinnedactivities/"+username);
  }

}
