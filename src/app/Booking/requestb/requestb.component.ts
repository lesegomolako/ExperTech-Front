import { Component, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ BasketLine, Schedule, Booking} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { HttpClient } from '@angular/common/http';
import { ServiceData } from 'src/app/API Services/for Service/services';

export class ServiceOption
{
  ServiceID: any;
  OptionID: any;
  Name: string;
}

@Component({
  selector: 'app-requestb',
  templateUrl: './requestb.component.html',
  styleUrls: ['./requestb.component.css']
})
export class RequestbComponent implements OnInit {
  BookingForm: FormGroup;
  TypesID : number;
  ServicesID: number; 
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
  Service : ServiceData[];
  ServiceType= [];
  ServicePhotos = [];
  ServiceOptions : ServiceOption[];
  Schedge: Observable<Schedule[]>;
  Times =[];
  
  servControl = true;
  optControl = true;
  TimeDateControl = true;
  
  BookingData: Booking;

  MinDate = new Date();

  EnableForm()
  {
    this.BookingForm.get("ServiceControl").enable();  
    this.TypesID = this.BookingForm.value.TypeControl;
    console.log(this.Service)
  }

  EnableOptForm()
  {
    this.BookingForm.get("OptionControl").enable();
    this.BookingForm.get("TimeControl").enable();
    this.BookingForm.get("DateControl").enable();
    this.ServicesID = this.BookingForm.value.ServiceControl

  }


  ngOnInit(): void 
  {
    if(this.api.RoleID == "1")
    {
      this.BookingForm = this.fb.group({
        ServiceControl : new FormControl({value: '', disabled: true}, Validators.required),
        DateControl : new FormControl({value: '', disabled: true}, Validators.required),
        TimeControl : new FormControl({value: '', disabled: true}, Validators.required),
        OptionControl : new FormControl({value: '', disabled: true}),
        NotesControl : new FormControl(null),
        TypeControl: new FormControl()
      })
      this.LoadList();
      this.resetForm();
      this.TypesID = 0
    
      //this.BookingData.ClientID = 2;
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }


resetForm(form?: NgForm)
{
  if(form != null)
  form.reset();

  this.BookingData = 
  {
     BookingID: null,
    Client : null,
    Status: null,
    BookingLines:
      [{
        ServiceID: null,
        OptionID: null,
        Service:null,
        Option:null,
      }],
      EmployeeSchedule: [
        {
            Date: null,
            StartTime: null,
            EndTime: null,
            Employee: null,
            canCancel: null
        }
    ],
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
        this.router.navigate(["ViewBooking"])
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

  if(this.BookingForm != null)
  this.BookingData.BookingNotes[0].Notes = this.BookingForm.value.NotesControl;
  
  this.BookingData.DateRequesteds[0].Date  = this.BookingForm.value.DateControl;
  this.BookingData.DateRequesteds[0].StartTime = this.BookingForm.value.TimeControl;
}

LoadList()
{
  this.http.get<[]>(this.api.url + "Booking/getALLemployees")
  .subscribe(res => {this.Employee = res})
  this.http.get<[]>(this.api.url + "Booking/getALLservices")
  .subscribe(res => {this.Service = res})
  this.http.get<[]>(this.api.url + "Booking/getALLservicesoption")
  .subscribe(res => {this.ServiceOptions = res})
  this.http.get<[]>(this.api.url + "Booking/getALLservicestype")
  .subscribe(res => {this.ServiceType = res})
  this.http.get<[]>(this.api.url + "Booking/getTimes")
  .subscribe(res => {this.Times = res})
  this.Schedge = this.http.get<Schedule[]>(this.api.url + "Booking/getSchedge") 
}

list(){
  this.router.navigate(['Home']);
}

}
