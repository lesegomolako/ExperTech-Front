import { Component, OnInit } from '@angular/core';
import { ExperTexhService } from '../API Services/for Booking/exper-texh.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private api: ExperTexhService, private router: Router) { }
  //RoleID = null;

  ngOnInit(): void {

  }

  goHome()
  {
    if(this.api.RoleID == "1" || this.api.RoleID == null)
    {
      this.router.navigate(["home"])
    }
    else
    {
      this.router.navigate(["employeehome"])
    }

  }

}
