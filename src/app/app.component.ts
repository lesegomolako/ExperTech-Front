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
  RoleID = null;
  
  toggleSidebar()
  {
    document.getElementById("sidebar").classList.toggle('active');
  }

  constructor(private router: Router,private rService: ReportingService, public api: ExperTexhService){}
   
  ngOnInit()
  {
    
    if (this.api.SessionID != null)
    {
      this.RoleID = this.api.RoleID;
    }

    this.api.getBadgeCount();
    
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
    sessionStorage.clear();

    this.RoleID = null;
    alert("Logged out successfully. Re-directing to homepage");

    this.router.navigateByUrl('/home')
    .then(() => {
      window.location.reload();
    });

  }
  
}
