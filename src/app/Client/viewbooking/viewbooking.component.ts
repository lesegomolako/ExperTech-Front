import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Booking} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent implements OnInit {
  id: any;

  booking :  Booking[];
  name: string;

  constructor(private api: ExperTexhService, private router: Router,private route: ActivatedRoute, private snack: MatSnackBar) { }
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
      this.router.navigate(["404Forbidden"])
    }
  }

  list(){
    this.router.navigate(['Booking']);
  }

  reject(BookingID){
    this.api.RejectBooking(BookingID).subscribe(res=>
      {
        if(res == "success")
        {
          this.snack.open("Booking successfully rejected.", "OK", {duration:3000})
          window.location.reload();
        }
        else
        {
          alert(res)
        }
     
     });
    
  }

  cancel(BookingID){
    
    if(confirm("Are you sure you want cancel this booking?"))
    {
      this.api.CancelBooking(BookingID).subscribe(res=> 
        {
          if(res == "success")
          {
            this.snack.open("Booking successfully cancelled.", "OK", {duration:3000}) ;
            window.location.reload();
          }  
      });
    }
  }

  

  Accept(BookingID){
    this.api.AcceptBooking(BookingID).subscribe((res:any)=>{
      if(res == "success")
      {
        this.snack.open("Booking successfully accepted", "OK", {duration: 3000})
        window.location.reload();
      }      
     });
    
  }
}
