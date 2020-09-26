import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './API Services/for Booking/client';
import { ExperTexhService } from './API Services/for Booking/exper-texh.service';
import { ReportingService } from './API Services/for User/reporting.service';
import { UserData } from './Staff/setup/setup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Screens';
  showBadges = true;
  RoleID = null;
  User;
  
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
    this.api.getProfile().subscribe(data => {
      //console.log("User Details",data.ContactNo)
      //this.User = data;
      this.mapValues(data)
    })
  }

mapValues(data:User)
{
  if(this.api.RoleID == "1" )
  {
    this.User =
    {
      Name: data.Clients[0].Name,
      Surname: data.Clients[0].Surname,
      Email: data.Clients[0].Email,
    }
  }
  else if(this.api.RoleID == "2" )
  {
    this.User =
    {
      Name: data.Admins[0].Name,
      Surname: data.Admins[0].Surname,
      Email: data.Admins[0].Email,
    }
  }
  else if(this.api.RoleID == "3" )
  {
    this.User =
    {
      Name: data.Employees[0].Name,
      Surname: data.Employees[0].Surname,
      Email: data.Employees[0].Email,
    }
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
  
}
