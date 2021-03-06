import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from 'src/app/app.component';
//import {Service } from '../services.service';


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
    public service: ReportingService,
    private route: ActivatedRoute,
    private api: ExperTexhService, private snack:MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.LoginFormGroup.controls[controlName].hasError(errorName);
  };
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
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
  //removing access token that has sets, goes with public router above
  Logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']);
  }

  errorMessage: string;
  userMessage: string;
  showError: any;
  //success = false;
  //loginFalied = false;
  redirectURL: string;

  Login(){

    this.showError = false;
    if(this.loginForm.invalid)
    {
      this.loginForm.markAllAsTouched();
      return;
    }

    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
        this.redirectURL = params['redirectURL'];
    }

    this.user = this.loginForm.value;
    const dialogRef = this.dialog.open(LoadingDialog, { disableClose: true })
    this.service.Login(this.user).subscribe((res : any) =>
    {
      if(res.Error == "invalid")
      {
        alert(res.Message)
        return;
      }
      else if(res.Error) { 
        dialogRef.close();  //lol
        this.errorMessage = res.Error;
        this.showError = true;
        //alert("Username or Password are invalid")
      }
      else{
        dialogRef.close();
        sessionStorage.setItem("accessToken", res.SessionID);
        sessionStorage.setItem("RoleID", res.RoleID)
        this.api.RoleID = sessionStorage.getItem("RoleID")
        if(this.api.RoleID == "1")
        {

        //   if (this.redirectURL) {        
        //     this.router.navigateByUrl(this.redirectURL,)
        //         .catch(() => this.router.navigate(['homepage']))
        // } else {
        
        //     this.router.navigate(['homepage'])
        // }
          dialogRef.close();
          this.router.navigate(["home"])
          .then(() => {
            window.location.reload();
          });
        }
        else
        {

        //   if (this.redirectURL) {        
        //     this.router.navigateByUrl(this.redirectURL,)
        //         .catch(() => this.router.navigate(['homepage']))
        // } else {
        
        //     this.router.navigate(['homepage'])
        // }
          dialogRef.close();
          this.router.navigate(["employeehome"])
          .then(() => {
            window.location.reload();
          });
        }
        
        this.showError = false;
      }
    }, error => {console.log(error),dialogRef.close(); this.snack.open("Something went wrong", "OK", {duration:3000})})
  }

  matcher = new ErrorStateMatcher();

}
