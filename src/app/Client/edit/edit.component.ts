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

      this.editForm = this.formBuilder.group({
        firstName: ['', [ Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
        lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
        contact: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email,Validators.minLength(2),Validators.maxLength(50)]],
        userid:''
        });
      
      this.api.getProfile().subscribe(data => {
        //console.log("Contact Number",data.ContactNo)
        //this.user = data;
        this.mapValues(data);
      }, error => console.log("error edit component",error));
      
      
    } 
    else
    {
      this.router.navigate(["403Forbidden"])
    }

}

mapValues(data: User)
{
  if(this.api.RoleID == "1" )
  {
    this.editForm.setValue(
      {
        firstName: data.Clients[0].Name,
        lastName: data.Clients[0].Surname,
        contact: data.Clients[0].ContactNo,
        email: data.Clients[0].Email,
        userid: data.UserID
      }
    )
  }
  else if(this.api.RoleID == "2" )
  {
    this.editForm.setValue(
      {
        firstName: data.Admins[0].Name,
        lastName: data.Admins[0].Surname,
        contact: data.Admins[0].ContactNo,
        email: data.Admins[0].Email,
        userid: data.UserID
      }
    )
  }
  else if(this.api.RoleID == "3" )
  {
    this.editForm.setValue(
      {
        firstName: data.Employees[0].Name,
        lastName: data.Employees[0].Surname,
        contact: data.Employees[0].ContactNo,
        email: data.Employees[0].Email,
        userid: data.UserID
      }
    )
  }
}


omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

onSubmit(form) 
{
  this.editForm=form;
  this.submitted = true;

        // stop here if form is invalid
  if (this.editForm.invalid) 
  {
    alert("form is invalid")
    return;
  }

  let updatedProfile;

  if(this.api.RoleID == "1")
  {
     updatedProfile = {
      SessionID: this.api.SessionID,
      RoleID: this.api.RoleID,
      Clients:[{
      UserID:this.editForm.value.userid,
      RoleID: this.api.RoleID,
      Name:this.editForm.value.firstName,
      Email:this.editForm.value.email,
      ContactNo:this.editForm.value.contact,
      Surname:this.editForm.value.lastName}]
    }    
  }
  else if(this.api.RoleID == "2") 
  {
     updatedProfile = {
      SessionID: this.api.SessionID,
      RoleID: this.api.RoleID,
      Admins:[{
      UserID:this.editForm.value.userid,
      Name:this.editForm.value.firstName,
      Email:this.editForm.value.email,
      ContactNo:this.editForm.value.contact,
      Surname:this.editForm.value.lastName}]
    }    
  }
  else if(this.api.RoleID == "3") 
  {
     updatedProfile = {
      SessionID: this.api.SessionID,
      RoleID: this.api.RoleID,
      Employees:[{
      UserID:this.editForm.value.userid,
      Name:this.editForm.value.firstName,
      Email:this.editForm.value.email,
      ContactNo:this.editForm.value.contact,
      Surname:this.editForm.value.lastName}]
    }    
  }
        
  this.api.updateClient(updatedProfile).subscribe(res=>{
    if(res =="success")
    {
      alert("Profile successfully updated")
      this.router.navigate(["Profile"])
    }
    else
    {
      alert(res +".Try again.")
    }
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
