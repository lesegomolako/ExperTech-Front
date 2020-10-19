import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import { Router } from '@angular/router';
import { User } from '../../API Services/for Booking/client';
//import { sha256, sha224 } from 'js-sha256';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { ServiceTypeData } from 'src/app/API Services/for Service/services';
import { map } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { of } from 'rxjs'; //of rxjs to use function
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

export class EmployeeData
{
  UserData:
  {  RoleID: any;
    SessionID: string;
    Username: string;
    Password: string;
    Employees:
    [  {
        Name: string;
        Surname: string;
        ContactNo: string;
        Email: string;
      }
    ]
  };
  ServiceTypes:
  []

}

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.sass'],
})
export class EmployeeRegisterComponent implements OnInit {
  empForm: FormGroup;
  submitted = false;
  RoleID = 3;
  Types: ServiceTypeData[];
  

  public RegisterFormGroup: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService,
    private router: Router,
    private ServiceService: ServicesService,
    private api: ExperTexhService
  ) {}

  mobNumberPattern = "^(\\+27|0)?[0-9]{10}$"; 

  ngOnInit() {

    if(this.api.RoleID == "2")
    {
      this.empForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required,  Validators.pattern(this.mobNumberPattern)]],
        types: this.formBuilder.array([], this.minSelectedCheckboxes(1))
      });

      //this gets the single instance of the Types list and pushes the formControl
      this.ServiceService.getServiceTypes().subscribe(res =>{
        this.Types = res;
        res.forEach(() => this.AddCheckBoxes() )//pushes the formControl
      })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  valid()
  {
    console.log(this.empForm.value.types)
  }

   minSelectedCheckboxes(min = 1) {
    const validator: Validators = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  AddCheckBoxes()
  {
    (<FormArray>this.empForm.get('types')).push(new FormControl(false))
  }

  
  
  // convenience getter for easy access to form fields
  get f() {
    return this.empForm.controls;
  }

  //List: Observable<Process[]>;

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.empForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.empForm.value));
  }

  loadList(){
    
  }
  onReset() {
    this.submitted = false;
    this.empForm.reset();
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  omit_special_num_char(event) {
    var theEvent = event || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  user: EmployeeData;

  
  RegisterEA(){

    const selectedOrderIds = this.empForm.value.types
      .map((checked, i) => checked ? this.Types[i].TypeID : null)
      .filter(v => v !== null);
    

    this.user = {
      UserData:
      {
        RoleID: this.RoleID,
        SessionID: "",
        Username:"",
        Password:"",
        Employees:
        [{
          Name: this.empForm.value.firstName,
          Surname: this.empForm.value.lastName,
          Email: this.empForm.value.email,
          ContactNo: this.empForm.value.contact
        }]
      },
      ServiceTypes:selectedOrderIds,   
    }

    console.log(this.user);

    
    if(this.empForm.valid)
    {
   
    this.service.RegisterEmployee(this.user).subscribe((res: any) =>{
      if(res == "success")
      {
        alert("Employee successfully registered. An email has been sent to the employee.")
        this.router.navigate(["employee"])
      }})
      this.submitted = true;
    }
    else
    {
      alert("form is invalid")
    }
  }


previousForm() {
  window.history.back();
}

  resetForm(form?: NgForm) {
    if (form != null) form.reset();

    this.service.formData = {
      AdminID: null,
      Name: null,
      Surname: null,
      ContactNo: null,
      Email: null,
      EmployeeID: null,
      UserID: null,
      ClientID: null,
      Username: null,
      Password: null,
      Times: {
        StartTime: null,
        EndTime: null,
      },
      Dates: {
        StartDate: null,
        EndDate: null,
      },
      Reminder: null,
      Quantity: null,
      Payment: null,
      Description: null,
      PackageID: null,
      ServiceID: null,
      Type: null,
      StatusID: null,
      TypeID: null,
      SessionID: null,
      InfoID: null,
      Address: null,
    };
  }
}

