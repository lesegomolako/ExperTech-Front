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

  client :  Client;
  name: string;
  
  constructor(private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    
    if(this.api.RoleID != null)
    {
      this.client = new Client();
      console.log(this.api.RoleID)

      this.id = this.route.snapshot.params['id'];
      
      this.api.getClientdetails(this.id).subscribe(data => {
        console.log("Client Details",data.ContactNo)
        this.client = data;
      }, error => console.log("Error",error));
    }
    else
    {
      this.router.navigate(["403Forbidden"])
      return;
    }
    

  }

  list(){
    this.router.navigate(['ClientProfile']);
  }

}
