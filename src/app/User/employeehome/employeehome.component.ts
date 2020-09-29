import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.sass']
})
export class EmployeehomeComponent implements OnInit {

  constructor(private api: ExperTexhService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.RoleID == "1" || this.RoleID == null)
    {
      this.router.navigate(["403Forbidden"])
    }

  }
  RoleID = this.api.RoleID;

}
