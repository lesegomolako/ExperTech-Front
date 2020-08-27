import { Component, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ BasketLine, Schedule, Booking} from 'src/app/client';
import { ExperTexhService } from 'src/app/exper-texh.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-makebooking',
  templateUrl: './makebooking.component.html',
  styleUrls: ['./makebooking.component.sass']
})
export class MakebookingComponent implements OnInit {
  BookingForm: FormGroup;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private http: HttpClient,private api: ExperTexhService, private fb: FormBuilder,
     private router: Router,private route: ActivatedRoute) { }

  Employee = [];
  Service = [];
  ServiceType= [];
  ServicePhotos = [];
  ServiceOptions = [];
  Schedge: Observable<Schedule[]>;
  Times =[];
  
  
  BookingData: Booking;

  

  ngOnInit(): void {
    
    this.BookingForm = this.fb.group({
      ServiceControl : new FormControl('', Validators.required),
      DateControl : new FormControl('', Validators.required),
      TimeControl : new FormControl('', Validators.required),
      OptionControl : new FormControl('',Validators.required),
      NotesControl : new FormControl(''),
    })
    this.LoadList();
    this.resetForm();

    this.BookingData.ClientID = 2;
}

resetForm(form?: NgForm)
{
  if(form != null)
  form.reset();

  this.BookingData =
  {
     BookingID: null,
    ClientID : 2,
    BookingLines:
      [{
        ServiceID: null,
        OptionID: null,
      }],
  
    DateRequesteds:
      [{
        Date: null,
        StartTime: null,
      }],
    
  
    BookingNotes:  
      [{
        Notes: null,
      }]
    
  }
  
}

onSubmit()
{
  this.MapValue();
  this.api.Requestbookingdetails(this.BookingData)
  .subscribe(res =>
    {
      if(res == "success")
      {
        alert("Booking successfully requested")
        
      }
      else
      {
        console.log(res)
      }
    })

  console.log(this.BookingForm.value)
}

MapValue()
{
  this.BookingData.BookingLines[0].ServiceID = this.BookingForm.value.ServiceControl
  this.BookingData.BookingLines[0].OptionID = this.BookingForm.value.OptionControl;
  this.BookingData.BookingNotes[0].Notes = this.BookingForm.value.NotesControl;
  this.BookingData.DateRequesteds[0].Date  = this.BookingForm.value.DateControl;
  this.BookingData.DateRequesteds[0].StartTime = this.BookingForm.value.TimeControl;
}

LoadList()
{
  this.http.get<[]>("https://localhost:44375/api/Booking/getALLemployees")
  .subscribe(res => {this.Employee = res})
  this.http.get<[]>("https://localhost:44375/api/Booking/getALLservices")
  .subscribe(res => {this.Service = res})
  this.http.get<[]>("https://localhost:44375/api/Booking/getALLservicesoption")
  .subscribe(res => {this.ServiceOptions = res})
  this.http.get<[]>("https://localhost:44375/api/Booking/getALLservicestype")
  .subscribe(res => {this.ServiceType = res})
  this.http.get<[]>("https://localhost:44375/api/Booking/getTimes")
  .subscribe(res => {this.Times = res})
  this.Schedge = this.http.get<Schedule[]>("https://localhost:44375/api/Booking/getSchedge")
 
 
  
}

list(){
  this.router.navigate(['ClientProfile']);
}
}
