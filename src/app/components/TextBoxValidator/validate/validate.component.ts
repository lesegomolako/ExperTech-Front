
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperTexhService } from '../../../API Services/for Booking/exper-texh.service';
import { Router } from "@angular/router";
import { FormsModule  } from "@angular/forms";
import{ User, Client} from '../../../API Services/for Booking/client';
import { MustMatch } from 'src/app/components/must-match.validator';
import { Observable } from 'rxjs';
import { sha256, sha224 } from 'js-sha256';
import { LoadingDialog } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  validateForm: FormGroup;
  submitted = false;
  title = 'Register';

  public RegisterFormGroup: FormGroup;


  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private snack:MatSnackBar,
    private api: ExperTexhService, private router: Router) {

  }
  user: User;
  client:Client[] = [];
  mobNumberPattern = "^(\\+27|0)?[0-9]{10}$";  

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }


  
  ngOnInit() {

    this.validateForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.minLength(2)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      Name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      Surname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      ContactNo: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
      Email: ['', [Validators.required, Validators.email,Validators.minLength(2),Validators.maxLength(50)]],
  }, {
    validator: MustMatch('Password', 'confirmPassword')
  });
  
}


omit_special_char(event)
{
  console.log("Omitting")
   var k;
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
    // convenience getter for easy access to form fields
    get f() { return this.validateForm.controls; }

    onSubmit(form) {
       
      this.submitted=true
       // stop here if form is invalid
      if (this.validateForm.invalid) 
      {
        console.log(this.validateForm)
        //stops here if for is invalid
        alert("Register details are invalid. Re-enter the correct details");
       return;
      }

      // display form values on success
    

      var temp:Client =
      {
        ClientID:null,
        Name:form.value.Name,
        Surname: form.value.Surname,
        ContactNo: form.value.ContactNo,
        Email: form.value.Email,
      }
      
      this.client.push(temp)

       const user=
       {
         UserID: "",
         RoleID: 1,
         Username:form.value.Username,
         Password: (form.value.Password),
         //Password: sha256(form.value.Password),
         SessionID: "",
         Clients: this.client
        }

        console.log("User data",user)
        const dialogRef = this.dialog.open(LoadingDialog, { disableClose: true })
        this.api.RegisterClient(user).subscribe((res: any)=>{
          if(res.Message == "success")
          {
            dialogRef.close();
            this.snack.open("Profile successfully registered. Logging in...", "OK", {duration: 2000})
            sessionStorage.setItem("accessToken", res.SessionID);
            sessionStorage.setItem("RoleID", res.RoleID)
            this.router.navigateByUrl('/home')
            .then(() => {
              window.location.reload();
            });
          }
          else if(res.Message == "duplicate")
          {
            dialogRef.close();
            alert(res.Error)
            this.validateForm.reset();
          }
          else
          {
            dialogRef.close();
            console.log(res)
          }
        }, error => {console.log(error); dialogRef.close(); this.snack.open("Something went wrong. Please try again later", "OK", {duration:4000})})
 
        this.submitted = true;    
    }

  public checkError = (controlName: string, errorName: string) => {
    return this.RegisterFormGroup.controls[controlName].hasError(errorName);
  }



  onReset() {
    this.submitted = false;
    this.validateForm.reset();
}





}
