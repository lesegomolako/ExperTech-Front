import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ User, Client} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})

export class EditComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  title = 'Edit';
  user: any;
  id: number;

  client :  Client;
  name: string;
  dataSaved = false;  
  customerForm: any;   
  massage = null;  
  
  public EditFormGroup: FormGroup;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private route: ActivatedRoute ,private api: ExperTexhService, private router: Router,) { }
 
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  openDialog() {
    confirm("Successfully registered ")
  }
  ngOnInit() {

    if(this.api.RoleID != null)
    {
      this.client = new Client();

      this.id = this.route.snapshot.params['id'];
      
      this.api.getClientdetails(this.id).subscribe(data => {
        console.log("Contact Number",data.ContactNo)
        this.client = data;
      }, error => console.log("error edit component",error));
      
      this.editForm = this.formBuilder.group({
          firstName: ['', [ Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
          lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
          contact: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
          email: ['', [Validators.required, Validators.email,Validators.minLength(2),Validators.maxLength(50)]],
          }, {
      
        });
    } 
    else
    {
      this.router.navigate(["403Forbidden"])
    }

}
list(){
  this.router.navigate(['ClientProfile']);
}




omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

    onSubmit(form) {
      this.editForm=form;
        this.submitted = true;

        // stop here if form is invalid
        if (this.editForm.invalid) {
            return;
        }

        let updatedClient:Client = {
          ClientID:this.client.ClientID,
          Name:this.editForm.value.firstName,
          Email:this.editForm.value.email,
          ContactNo:this.editForm.value.contact,
          Surname:this.editForm.value.lastName
        }
        
         this.api.updateClient(updatedClient).subscribe(data=>{
          alert("Updated Client")
         });
         
    }

  public checkError = (controlName: string, errorName: string) => {
    return this.EditFormGroup.controls[controlName].hasError(errorName);
  }



  onReset() {
    this.submitted = false;
    this.editForm.reset();
}
}
