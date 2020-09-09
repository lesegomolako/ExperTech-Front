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
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {
  id: any;

  booking :  Booking;
  name: string;

  constructor(private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }
  openDialog() {
    confirm("Successfully cancelled")
  }

  ngOnInit(): void {
    this.booking = new Booking();

    this.id = 2

    this.api.ViewClientBooking(this.id).subscribe(data => {
      console.log("Client Booking Details",data)
      this.booking = data;
    }, error => console.log("Error",error));

  }

  list(){
    this.router.navigate(['Booking']);
  }

  confirm(){
    this.api.RejectBooking(this.id).subscribe(data=>{
      alert("Booking successfully rejected,Booking will be deleted. Please make another booking with a different time")
     });
    
  }
  deletes(){
    this.api.RejectBooking(this.id).subscribe(data=>{
      alert("Booking successfully rejected,Booking will be deleted. Please make another booking with a different time")
     });
    
  }
  cancel(){
    this.api.CancelBooking(this.id).subscribe(data=>{
      alert("Booking successfully rejected,Booking will be deleted. Please make another booking with a different time")
     });
    
  }
}