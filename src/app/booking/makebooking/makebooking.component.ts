import { Component, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Client, Schedule, Booking} from 'src/app/client';
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
  submitted = false;
  title = 'Edit';
  user: any;
  id: number;

  client :  Client;
  name: string;
  dataSaved = false;  
  customerForm: any;   
  massage = null;  

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  public MakeFormGroup: FormGroup;
  constructor(public dialog: MatDialog,private http: HttpClient,private api: ExperTexhService, private fb: FormBuilder,
     private router: Router,private route: ActivatedRoute) { }

  Employee = [];
  Service = [];
  ServiceType= [];
  ServicePhotos = [];
  ServiceOptions = [];
  Schedge: Observable<Schedule[]>;
  Times =[];
  
  servControl = true;
  optControl = true;
  TimeDateControl = true;
  
  BookingData: Booking;

  EnableForm()
  {
    this.servControl = false;
  }

  EnableOptForm()
  {
    this.optControl = false;

  }

  EnableTimeForm()
  {
    this.TimeDateControl = false;

  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  ngOnInit(): void {
    
    this.BookingForm = this.fb.group({
      ServiceControl : new FormControl('', Validators.required),
      DateControl : new FormControl('', Validators.required),
      TimeControl : new FormControl('', Validators.required),
      OptionControl : new FormControl('',Validators.required),
      NotesControl : new FormControl(''),
      firstName: ['', [ Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      contact: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email,Validators.minLength(2),Validators.maxLength(50)]],


 
    })
    this.LoadList();
    this.resetForm();

    this.BookingData.ClientID = 2;
}
omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
    // convenience getter for easy access to form fields
    get f() { return this.BookingForm.controls; }
resetForm(form?: NgForm)
{
  if(form != null)
  form.reset();

  this.BookingData =
  {
     BookingID: null,
    ClientID : 2,
    Status: null,
    BookingLines:
      [{
        ServiceID: null,
        OptionID: null,
        Service:null,
      }],
      EmployeeSchedule: [
        {
            Date: null,
            StartTime: null,
            EndTime: null,
            Employee: null,
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

onSubmit(form)
{
  this.BookingForm=form;
  this.submitted = true;

  // stop here if form is invalid
  if (this.BookingForm.invalid) {
      return;
  }

  let updatedClient:Client = {
    ClientID:this.client.ClientID,
    Name:this.BookingForm.value.firstName,
    Email:this.BookingForm.value.email,
    ContactNo:this.BookingForm.value.contact,
    Surname:this.BookingForm.value.lastName
  }
  
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
public checkError = (controlName: string, errorName: string) => {
  return this.MakeFormGroup.controls[controlName].hasError(errorName);
}
onReset() {
  this.submitted = false;
  this.BookingForm.reset();
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
  this.router.navigate(['Home']);
}
// openDialog() {

//   const dialogConfig = new MatDialogConfig();

//   dialogConfig.disableClose = true;
//   dialogConfig.autoFocus = true;

//   this.dialog.open(CourseDialogComponent, dialogConfig);
// }
}


