import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperTexhService } from '../API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.css']
})
export class ForbiddenPageComponent implements OnInit {

  constructor(private api: ExperTexhService, private router: Router) { }

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
