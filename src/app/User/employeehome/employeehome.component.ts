import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.sass']
})
export class EmployeehomeComponent implements OnInit {

  constructor(private api: ExperTexhService, private router: Router) { }

  RoleID;

  ngOnInit(): void {
    
    if(this.api.RoleID == "2" || this.api.RoleID == "3")
    {
      this.RoleID = this.api.RoleID;
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

 
  

}
