import { Component, Inject, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__, NgModule } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Client, Schedule, Booking} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { HttpClient } from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';



export class Employee
{
  EmployeeID:any;
  Name:string;
  TypeID:any;
}

@Component({
  selector: 'app-makebooking',
  templateUrl: './makebooking.component.html',
  styleUrls: ['./makebooking.component.css']
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

  TypesID: number;
  ServicesID: number;

  clear()
  {
    this.BookingForm.patchValue(
      {
        clientid:"",
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
      }
    )
  }


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
  
 // BookingData: Booking;

  EnableForm()
  {
    this.BookingForm.get("ServiceControl").enable();
    this.BookingForm.get("employeeControl").enable();  
    this.ServicesID = this.BookingForm.value.ServiceControl
  }

  EnableOptForm()
  {
    this.BookingForm.get("OptionControl").enable();
    this.ServicesID = this.BookingForm.value.ServiceControl

  }

  EnableTimeForm()
  {
    this.BookingForm.get("TimeControl").enable();
    this.BookingForm.get("DateControl").enable();
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
      this.BookingForm = this.fb.group({
        ServiceControl : new FormControl({value: '', disabled: true}, Validators.required),
        DateControl : new FormControl({value: '', disabled: true}, Validators.required),
        TimeControl : new FormControl({value: '', disabled: true}, Validators.required),
        OptionControl : new FormControl({value: '', disabled: true}),
        employeeControl : new FormControl({value: '', disabled: true},Validators.required),
        NotesControl : new FormControl(''),
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        contact: ['', Validators.required],
        email: ['', Validators.required],
        clientid: ''
      })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }

  
    this.LoadList();

    //this.BookingData.ClientID = 2;
}

openAddDialog(): void {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.width = '500px';
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  const dialogRef = this.dialog.open(AddClientDialog, dialogConfig);

  dialogRef.afterClosed().subscribe((res:any) => {
    console.log('The dialog was closed');
    this.BookingForm.patchValue(
      {
        clientid: res.ClientID,
        firstName: res.Name,
        lastName: res.Surname,
        contact: res.ContactNo,
        email: res.Email,
      }
    )
  });
}

openSearchDialog(): void {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.width = '500px';
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  const dialogRef = this.dialog.open(SearchClientDialog, dialogConfig);

  dialogRef.afterClosed().subscribe((res:any) => {
    console.log('The dialog was closed');
    this.BookingForm.patchValue(
      {
        clientid: res.ClientID,
        firstName: res.Name,
        lastName: res.Surname,
        contact: res.ContactNo,
        email: res.Email,
      }
    )
  });
}

omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
    // convenience getter for easy access to form fields
    get f() { return this.BookingForm.controls; }


onSubmit(form)
{
  this.BookingForm=form;
  console.log(form)
  this.submitted = true;

  // stop here if form is invalid
  if (this.BookingForm.invalid) {
      alert("form invalid");
      return;
  }


  const BookingData = 
  {
    ServiceID : this.BookingForm.value.ServiceControl,
    OptionID : this.BookingForm.value.OptionControl,
    Notes : this.BookingForm.value.NotesControl,
    StartDate  : this.BookingForm.value.DateControl,
    TimeID : this.BookingForm.value.TimeControl,
    ClientID : this.BookingForm.value.clientid,
    EmployeeID: this.BookingForm.value.employeeControl,
    SessionID: this.api.SessionID  
  }
  

  this.api.Makebooking(BookingData)
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

@Component({
  selector: "add-client",
  templateUrl: './client.html'
})
export class AddClientDialog implements OnInit
{
  constructor(
    public dialogRef: MatDialogRef<AddClientDialog>, private api:ExperTexhService,
    private fb: FormBuilder, private http:HttpClient, private router: Router) {}

  ClientForm: FormGroup;

  ngOnInit()
  {
    if(this.api.RoleID == "2")
    {
      this.ClientForm = this.fb.group(
      {
        Name: ['', [ Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
        Surname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
        ContactNo: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
        Email: ['', [Validators.required, Validators.email,Validators.minLength(2),Validators.maxLength(50)]],
      })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
 
  onSubmit(form): void {
    console.log(form.value);
    this.http.post(this.api.url + "Clients/AddClient", form.value).subscribe((res:any) => {
      if(res.Message == "success")
      {
        alert("Client successfully added")
        this.dialogRef.close(res.Client);
      }
      else if(res.Message == "duplicate")
      {
        if(confirm("Client details already exist. Would you select this client?"))
        {
          console.log(res.Client)
          this.dialogRef.close(res.Client)
        }
      }
      else
      {
        alert(res.Message)
      }
      
    })
    
  }
}

@Component({
  selector: "search-client",
  templateUrl: './search.html'
})
export class SearchClientDialog implements OnInit
{
  constructor(
    public dialogRef: MatDialogRef<SearchClientDialog>, private api:ExperTexhService,
    private fb: FormBuilder, private http:HttpClient) {}

    myControl = new FormControl();
    options: any[] 
    filteredOptions: Observable<string[]>;
  
    ngOnInit() {

      this.http.get<[]>(this.api.url + 'Client/getClient')
      .subscribe(res => {this.options = res});
      console.log(this.options)

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

      
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

  
}



