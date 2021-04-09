import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { faSignInAlt,faClipboard,faCalendarCheck,faBars,faUserCircle,faBell} from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons'

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
  constructor(private us:UserService,private rt:Router){}

  ngOnInit()
  {
    this.us.getUser().subscribe(
      res => {
        this.username = res;
      }
    )
  }

  logout()
  {
    localStorage.clear();
    this.us.setUser(undefined);
    this.rt.navigateByUrl("/forms/login");
  }

  
}
