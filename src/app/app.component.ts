import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import { Observable } from 'rxjs';
import { Employee, User } from './API Services/for Booking/client';
import {map} from 'rxjs/operators';
import { ExperTexhService } from './API Services/for Booking/exper-texh.service';
import { ReportingService } from './API Services/for User/reporting.service';
import { UserData } from './Staff/setup/setup.component';
import { HttpClient } from '@angular/common/http';

export interface ProfileData<MetaType=any>
{
  Name: string;
  Surname: string;
  Email:string;
  ContactNo?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Screens';
  showBadges = true;
  RoleID = null;
  User: Observable<ProfileData<User>>
  
  toggleSidebar()
  {
    document.getElementById("sidebar").classList.toggle('active');
  }

  constructor(private router: Router, private http: HttpClient,
    private rService: ReportingService, public api: ExperTexhService)
    { 
      router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })}
   
  ngOnInit()
  {
    
    if (this.api.SessionID != null)
    {
      this.RoleID = this.api.RoleID;
    }

    this.api.getBadgeCount();
    //this.api.getProfile().subscribe(res => {console.log(res)});
    this.User = this.api.getProfile()
     .pipe(map((res: User) => {
      switch (res.RoleID) {
        case 1:
            return {Name: res.Clients[0].Name, Surname: res.Clients[0].Surname, Email:res.Clients[0].Email };       
        case 2:
          return {Name: res.Admins[0].Name, Surname: res.Admins[0].Surname, Email:res.Admins[0].Email };
        case 3:
          return {Name: res.Employees[0].Name, Surname: res.Employees[0].Surname, Email:res.Employees[0].Email };
      }
    }))

    
  }

  goHome()
  {
    if(!this.RoleID || this.RoleID == "1")
    {
      this.router.navigate(["home"])
    }
    else
    {
      this.router.navigate(["employeehome"])
    }
  }

  login()
  {
    var sessionID = sessionStorage.getItem('accessToken')
    if (sessionID)
    {
      this.router.navigateByUrl('/ClientProfile')
    }
    else
    {
      this.router.navigateByUrl('/login')
    }
  }

  logout()
  {
    this.api.logout().subscribe(res =>
      {
        if(res == "success")
        {
        sessionStorage.clear();

        this.RoleID = null;
    
        this.router.navigateByUrl('/home')
        .then(() => {
          window.location.reload();
        });
        }
    
      })
    
  }

  showOverlay = false;

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
  
}
