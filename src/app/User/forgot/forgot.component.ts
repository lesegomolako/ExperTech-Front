import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.sass']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  email: FormControl;
  submitted = false;
  public ForgotFormGroup: FormGroup;
  constructor(
    public dialog: MatDialog, 
    private formBoilder: FormBuilder,
    public service: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = this.formBoilder.control('', Validators.required)
    // this.forgotForm = this.formBoilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }
  //convenienve getter for easy access to form fields
  get f() {return this.email; }

  onSubmit(username) {
    this.submitted = true;

    //stop here if form is invalid
    
    

    this.service.forgotPassword(username).subscribe(res =>
      {
        if(res == "success")
        {
          alert("Check your email for reset link")
          this.router.navigate(["home"])
        }
        else
        {
          alert("Email is invalid. Enter a valid email")
          this.email.reset();
        }
      })

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.forgotForm.value))
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.ForgotFormGroup.controls[controlName].hasError(errorName);
  }
  onReset() {
    this.submitted = false;
    this.forgotForm.reset();
  }
  
  toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('active');
  }
  List: Observable<Process[]>



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
