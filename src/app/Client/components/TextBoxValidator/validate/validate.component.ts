
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperTexhService } from 'src/app/exper-texh.service';
import { Router } from "@angular/router";
import { FormsModule  } from "@angular/forms";
import{ User} from 'src/app/client';
import { MustMatch } from 'src/app/components/must-match.validator';
import { Observable } from 'rxjs';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.sass']
})



export class ValidateComponent implements OnInit {
  validateForm: FormGroup;
  submitted = false;
  title = 'Register';

  public RegisterFormGroup: FormGroup;


  constructor(public dialog: MatDialog, private formBuilder: FormBuilder ,private api: ExperTexhService, private router: Router) {

  }
  user: User;


  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  openDialog() {
    confirm("Successfully registered ")
  }
  
  ngOnInit() {
      this.user=
  {
    UserID: null,
    RoleID: null,
    Username: "",
    Password: "",
    SessionID: "",
    Clients: 
      {
            Name: "",
            Surname: "",
            ContactNo: "",
            Email: "",
      }

  }
    this.validateForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.minLength(2)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      ContactNo: ['', [Validators.required, Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  

  // this.resetForm();
}

// resetForm(form? : NgForm)
// {
//   if(form != null)
//   this.validateForm.reset()

//   this.user=
//   {
//     UserID: null,
//     RoleID: null,
//     Username: "",
//     Password: "",
//     SessionID: "",
//     Clients: 
//       {
//             Name: "",
//             Surname: "",
//             ContactNo: "",
//             Email: "",
//       }

//   }
// }
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
       if (this.validateForm.invalid) {
      // confirm("FORM IS INVALID");
       return;
    }

      // display form values on success
     if (confirm('SUCCESS!! :-)\n\n' + JSON.stringify(this.validateForm.value, null, 4)) )
     {
       this.user.Username=form.value.Username
       this.user.Password=form.value.Password
       this.user.Clients.Name=form.value.Name
       this.user.Clients.Email=form.value.Email
       this.user.Clients.Surname=form.value.Surname
       this.user.Clients.ContactNo=form.value.ContactNo
       
        console.log("User data",this.user)
        this.api.RegisterClient(this.user).subscribe((res: User)=>{
          localStorage.setItem("accessToken", res.SessionID);
          this.router.navigate(['ClientProfile'])
        })
          this.submitted = true;
  
        this.submitted = true;

     }
    }

  public checkError = (controlName: string, errorName: string) => {
    return this.RegisterFormGroup.controls[controlName].hasError(errorName);
  }



  onReset() {
    this.submitted = false;
    this.validateForm.reset();
}





}
