import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { Process, Package } from '../process';
import { Observable } from 'rxjs';
//import { ReportingService } from '../reporting.service';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import { BookingData } from '../get-bookings/get-bookings.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cbooking',
  templateUrl: './cbooking.component.html',
  styleUrls: ['./cbooking.component.sass']
})
export class CbookingComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService,
    private http: HttpClient
  ) { }

  List: any;
  cbookingForm: FormGroup;
  submitted = false;
  public CbookingFormGroup: FormGroup;
  bookingObject : BookingData;
  type: any;

  ngOnInit() 
  {
    //this.type = new FormControl();
    this.List = this.service.getPaymentType();
    //console.log(JSON.parse(localStorage.getItem("bookingPayment")))
    this.bookingObject = JSON.parse(localStorage.getItem("bookingPayment"))
  }
 
 
 previousForm() {
  window.history.back();
}

onSubmit()
{
  const payDetails =
  {
    BookingID: this.bookingObject.BookingID,
    PaymentTypeID: this.type,
    Price: this.bookingObject.Price   
  }

  this.service.bookingPayment(payDetails);
  console.log(payDetails)
}
  
  BookingPayment(form: NgForm){
   
  }

}
