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
//import { sha256, sha224 } from 'js-sha256';



export class User
{
  RoleID: any;
  SessionID: string;
  Username: string;
  Password: string;
  Admins:
  [
    {
      Name: string;
      Surname: string;
      ContactNo: string;
      Email: string;
    }
  ]
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  RoleID = 2;

  public RegisterFormGroup: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
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
  // RegisterEA(form: NgForm){
  //   this.service.RegisterEA(form.value).subscribe(ref => {this.loadList()});
  //   this.resetForm(form);
  // }

  user: User;

  
  RegisterEA(){
    SesseionID: "";
    
    this.mapValues();
    this.service.RegisterEA(this.user).subscribe((res: any) =>{
    if(res.Message == "success")
    {
      sessionStorage.set("accessToken", res.SessionID);
      this.router.navigate(["client"]);
    }
    })
    this.submitted = true;
    
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
    }]
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
