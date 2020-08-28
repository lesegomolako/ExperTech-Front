import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from '../services.service';
import { ServiceData } from '../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ServicesService
  ) { }

  List: Observable<ServiceData[]>
  confirmForm: FormGroup;
  submitted = false;
  public ConfirmFormGroup: FormGroup;
  clientObject = this.service.formData;

  ngOnInit(): void {
  }
  previousForm() {
    window.history.back();
  }
  loadList(){
    this.List = this.service.getPaymentType()
    this.clientObject = this.service.formData;
  }
  hide = true;

forgotPassword(form: NgForm){
  this.service.FORGOTPASSWORD(form.value).subscribe(ref =>{this.loadList()});
}

 //populating the diting stuff
 fillUP(formData: ServiceData)
 {
   this.service.formData = formData;
 }
 
 Activate(form: NgForm){
    this.service.activateSerPackage(form.value).subscribe(ref => {this.loadList()});
 }

}
