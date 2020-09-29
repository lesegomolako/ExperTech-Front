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

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService
  ) {}

  //List: Observable<Process[]>
  confirmForm: FormGroup;
  submitted = false;
  public ConfirmFormGroup: FormGroup;
  clientObject = this.service.formData;

  onSubmit(){}

ngOnInit() {
    this.loadList();

    this.confirmForm = this.formBuilder.group(
      {
        PaymentType: ['', Validators.required]
      }
    )
  }
  

  
  
loadList(){
    //this.List = this.service.getPaymentType()
    this.clientObject = this.service.formData;
  }
  hide = true;

previousForm() {
    window.history.back();
  }

forgotPassword(form: NgForm){
  this.service.FORGOTPASSWORD(form.value).subscribe(ref =>{this.loadList()});
}

 //populating the editing stuff
 fillUP(formData: Process)
 {
   this.service.formData = formData;
 }
 
 Activate(form: NgForm){
   
    //this.service.activateSerPackage(form.value).subscribe(ref => {this.loadList()});
 }

 user:Process;
 SPackage(){
   //this.service.activateSerPackage(this.user).subscribe(ref => {this.loadList()});
 }



}
