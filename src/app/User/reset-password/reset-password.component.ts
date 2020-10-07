import { Component, OnInit } from '@angular/core';
//import { Process } from '../process';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MustMatch } from 'src/app/components/must-match.validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;

  public FpasswordFormGroup: FormGroup;

  constructor(
    private formBoilder: FormBuilder,
    private service: ReportingService,
    private router: Router,
    private ActRoute: ActivatedRoute
  ) {}

  SessionID;
  ngOnInit(): void {

    this.SessionID = this.ActRoute.snapshot.queryParams['SessionID'];

    this.resetForm = this.formBoilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validator: MustMatch('password', 'cpassword')
    });
  }
  //convenienve getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  

  onSubmit() {
    //stop here if form is invalid
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    let newPassword = 
    {
      SessionID: this.SessionID,
      Password: this.resetForm.value.password
    }

    console.log(newPassword.Password)

    this.service.restPassword(newPassword).subscribe((res:any) => {
      if(res = "success")
      {
        alert("Password successfully reset")
        this.router.navigate(["login"])
      }
      else if(res.Error = "session")
      {
        alert(res.Message)
      }
      else
      {
        console.log(res)
      }
    })
  }
  List: Observable<Process[]>
}
