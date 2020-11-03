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
import { DatePipe } from '@angular/common';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { OptionsFilterPipe } from 'src/app/API Services/for Booking/Pipes/options-filter.pipe';

export class ServiceOption
{
  ServiceID: any;
  OptionID: any;
  Name: string;
}

@Component({
  selector: 'app-requestb',
  templateUrl: './requestb.component.html',
  styleUrls: ['./requestb.component.css'],
  providers:[DatePipe, OptionsFilterPipe]
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

  constructor(private http: HttpClient,private api: ExperTexhService, private fb: FormBuilder,private datepipe: DatePipe,
     private router: Router, private optPipe:OptionsFilterPipe, private route: ActivatedRoute, private service: ServicesService) { }

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
  toDate = this.datepipe.transform(this.MinDate, 'dd/MM/yy');
  toTime = this.datepipe.transform(this.MinDate, 'HH:mm')
  selectedDate;

  get f()
  {
    return this.BookingForm.controls;
  }

  checkOptions()
  {
    var list = this.optPipe.transform(this.ServiceOptions, this.ServicesID);
    var count = list.length
    if(count == 0)
    {
      this.BookingForm.get("OptionControl").clearValidators();
      this.BookingForm.get("OptionControl").updateValueAndValidity();
      console.log("clear validator")
    }
    else
    {
      console.log("set validator")
      this.BookingForm.get("OptionControl").setValidators(Validators.required);
      this.BookingForm.get("OptionControl").updateValueAndValidity();
    }
  }

  EnableForm()
  {
    this.BookingForm.get("ServiceControl").enable();  
    this.TypesID = this.BookingForm.value.TypeControl;
    console.log(this.Service)
  }

  EnableOptForm(Service:ServiceData)
  {
    this.imageURL = Service.Image;
    this.BookingForm.get("OptionControl").enable();
    this.BookingForm.get("TimeControl").enable();
    this.BookingForm.get("DateControl").enable();
    this.ServicesID = this.BookingForm.value.ServiceControl

  }

  EnableTimeForm(event)
  {
    var selectedDate: Date = event;
  
    this.selectedDate = this.datepipe.transform(selectedDate, 'dd/MM/yy');
  // this.BookingForm.get("TimeControl").enable();
  }

  imageURL;
  ViewImage() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = <HTMLImageElement>document.getElementById("img01");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = this.imageURL;
    captionText.innerHTML = "Service Photo"
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
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
        TypeControl: new FormControl(null, Validators.required)
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
  this.service.getServices()
  .subscribe(res => { this.Service = res; })
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
