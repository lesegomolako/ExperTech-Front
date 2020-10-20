import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ User, Client} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';





@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css']
})
export class ClientprofileComponent implements OnInit {
  id: number;

  name: string;
  User;
  RoleID;
  
  constructor(private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    
    if(this.api.RoleID != null)
    {   
      this.RoleID = this.api.RoleID;   
      this.api.getProfile().subscribe(data => {
        //console.log("User Details",data.ContactNo)
        //this.User = data;
        this.mapValues(data)
      }, error => console.log("Error",error));
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
    

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
      ContactNo: data.Clients[0].ContactNo,
    }
  }
  else if(this.api.RoleID == "2" )
  {
    this.User =
    {
      Name: data.Admins[0].Name,
      Surname: data.Admins[0].Surname,
      Email: data.Admins[0].Email,
      ContactNo: data.Admins[0].ContactNo,
    }
  }
  else if(this.api.RoleID == "3" )
  {
    this.User =
    {
      Name: data.Employees[0].Name,
      Surname: data.Employees[0].Surname,
      Email: data.Employees[0].Email,
      ContactNo: data.Employees[0].ContactNo,
    }
  }
}

  goHome()
  {
    if(this.api.RoleID == "1")
    {
      this.router.navigate(["home"])
    }
    else
    {
      this.router.navigate(["employeehome"])
    }
  }

  list(){
    this.router.navigate(['ClientProfile']);
  }

}
