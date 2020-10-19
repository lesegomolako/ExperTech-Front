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
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { User } from 'src/app/API Services/for Booking/client';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { sha256, sha224 } from 'js-sha256';





@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.sass'],
})
export class AdminRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  RoleID = 2;

  public RegisterFormGroup: FormGroup;
  constructor(
    public dialog: MatDialog, private snack: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: ReportingService,
    private router: Router,
    private api: ExperTexhService
  ) {}

  mobNumberPattern = "^(\\+27|0)?[0-9]{10}$";  

  ngOnInit() {
    if(this.api.RoleID == "2")
    {
      this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
      });
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }

    
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  //List: Observable<Process[]>;

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  }

  loadList(){
    
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
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
  // RegisterEA(form: NgForm){
  //   this.service.RegisterEA(form.value).subscribe(ref => {this.loadList()});
  //   this.resetForm(form);
  // }

  user: User;

  
  RegisterEA(){
    SesseionID: "";
    if(this.registerForm.valid)
    {
    this.mapValues();
    this.service.RegisterAdmin(this.user).subscribe((res: any) =>{
      if(res == "success")
      {
        this.snack.open("Admin successfully registered", "OK", {duration: 3000})
        this.router.navigate(["admin"]);
      }
    }, error => {console.log(error), this.snack.open("Something went wrong", "OK", {duration: 3000})})
    
  }
  else
  {
    alert("form is invalid")
  }
    // this.user = {
    //   UserID: "",
    //   RoleID: 2,
    //   Username: form.value.Username,
    //   Password: sha256(form.value.Password),
    //   SessionID: "",
    // }
  }

mapValues()
{ 
    this.user = {
      RoleID: this.RoleID,
      SessionID: "",
      Username:"",
      Password:"",
      Admins:
      [{
        Name: this.registerForm.value.firstName,
        Surname: this.registerForm.value.lastName,
        Email: this.registerForm.value.email,
        ContactNo: this.registerForm.value.contact
      }], 
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
