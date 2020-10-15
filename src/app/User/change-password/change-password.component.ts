import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';
import { MustMatch } from 'src/app/components/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public service: ReportingService,
    private ActRoute: ActivatedRoute,
    private http: HttpClient,
    private api: ExperTexhService,
    private snack: MatSnackBar
  ) { }

  PasswordForm: FormGroup

  ngOnInit(): void {

    if (this.api.RoleID != null) {
      this.PasswordForm = this.fb.group({
        oldPassword: ['', [Validators.required,Validators.maxLength(300)]],
        newPassword: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(300)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(300)]]
      }, { validator: MustMatch('newPassword', 'confirmPassword') })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  omit_special_char(event) {
    console.log("Omitting")
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  get f() { return this.PasswordForm.controls; }

  public checkError = (controlName: string, errorName: string) => {
    return this.PasswordForm.controls[controlName].hasError(errorName);
  }

  changePassword() {
    
    if(this.PasswordForm.invalid)
    {
      this.PasswordForm.markAllAsTouched();
      this.snack.open("Please fill in all details","OK", {duration: 3000} )
      return;
    }

    const Passwords = 
    {
      oldPassword: this.PasswordForm.value.oldPassword,
      newPassword: this.PasswordForm.value.newPassword
    }

    this.service.ChangePassword(Passwords, this.api.SessionID).subscribe((res:any) => {
      if(res == "success")
      {
        this.snack.open("Password successfully changed", "OK", {duration: 3000})
        this.goHome();
        
      }
      else if(res.Error == "password")
        {
          alert(res.Message)
        }
        else if(res.Error == "session")
        {
          alert("Session is no longer valid");
        }
        else
        {
          console.log(res)
        }
    }, error => {console.log(error), this.snack.open("Something went wrong. Please try again later", "OK", {duration: 3000})})
  }

  goHome()
  {
    if(!this.api.RoleID || this.api.RoleID == "1")
    {
      this.router.navigate(["home"])
    }
    else
    {
      this.router.navigate(["employeehome"])
    }
  }

}
