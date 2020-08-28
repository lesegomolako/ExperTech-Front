import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  public LoginFormGroup: FormGroup;
  user: any;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    public service: ServicesService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      
    });
  }

  Logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']);
  }
  errorMessage: string;
  userMessage: string;
  showError: any;
  //success = false;
  //loginFalied = false;

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

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  
  Login(){
    this.service.Login(this.user).subscribe((res : any) =>{
      console.log(res);
      if(res.Error) {   //lol
        this.errorMessage = res.Error;
        this.showError = true;
      }
      else{
        localStorage.setItem("accessToken", res.SessionID);
        this.router.navigate(["home"])
        this.showError = false;
      }
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.LoginFormGroup.controls[controlName].hasError(errorName);
  };
  //matcher = new MyErrorStateMatcher();

}
