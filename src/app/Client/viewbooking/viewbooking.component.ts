import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Booking} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent implements OnInit {
  id: any;

  booking :  Booking[];
  name: string;

  constructor(private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }
  openDialog() {
    confirm("Successfully cancelled")
  }

  ngOnInit(): void {
    if(this.api.RoleID == "1")
    {
      this.api.ViewBookings(this.api.SessionID).subscribe(data => {
        console.log("Client Booking Details",data)
        this.booking = data;
      }, error => console.log("Error",error));
    }
    else
    {
      this.router.navigate(["404Page"])
    }
  }

  list(){
    this.router.navigate(['Booking']);
  }

  reject(){
    this.api.RejectBooking(this.id).subscribe(data=>{
      alert("Booking successfully rejected,Booking will be deleted. Please make another booking with a different time")
     });
    
  }
  cancel(){
    this.api.CancelBooking(this.id).subscribe(data=>{
      alert("Booking successfully rejected,Booking will be deleted. Please make another booking with a different time")
     });
    
  }

  // click(form: Booking)
  // {
  //   alert(JSON.stringify(form))
  // }

  Accept(){
    this.api.AcceptBooking(this.id).subscribe(data=>{
      alert("Booking successfully accepted")
     });
    
  }
}
