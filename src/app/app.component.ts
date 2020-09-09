import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperTexhService } from './API Services/for Booking/exper-texh.service';
import { ReportingService } from './API Services/for User/reporting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Screens';
  showBadges = true;
  clientLoggedIn = false;
  AdminLoggedIn = false;
  EmpLoggedIn = false;
  LoggedIn = false;
  
  toggleSidebar()
  {
    document.getElementById("sidebar").classList.toggle('active');
  }

  constructor(private router: Router,private rService: ReportingService, public api: ExperTexhService){}
   
  ngOnInit()
  {
    var sesh = sessionStorage.getItem("accessToken")
    if (sesh != null)
    {
    this.rService.CheckRole(sesh).subscribe(res => 
      {
        if (res = "client")
        {
          this.showBadges = true;
          this.api.getBadgeCount(sesh).subscribe(
            res =>
            {this.api.badgeCount = res}
          )
          this.clientLoggedIn = true;
          this.LoggedIn = true;
        }
        else if(res = "admin")
        {
          this.showBadges = false;
          this.AdminLoggedIn = true;
          this.LoggedIn = true;
        }
        else if(res = "employee")
        {
          this.showBadges = false;
          this.EmpLoggedIn = true;
          this.LoggedIn = true;
        }
      }
    )
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
    sessionStorage.removeItem('accessToken')
    this.clientLoggedIn = false;
    this.AdminLoggedIn = false;
    this.EmpLoggedIn = false;
    this.LoggedIn = false;
    confirm("Logged out successfully. Re-directing to homepage")
    this.router.navigateByUrl('/home')

  }
  
}
