import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private hc:HttpClient) { }

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

}
