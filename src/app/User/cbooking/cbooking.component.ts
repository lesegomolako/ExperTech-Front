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
//import { Process, Package } from '../process';
import { Observable } from 'rxjs';
//import { ReportingService } from '../reporting.service';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-cbooking',
  templateUrl: './cbooking.component.html',
  styleUrls: ['./cbooking.component.sass']
})
export class CbookingComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService
  ) { }

  List: Observable<Process[]>
  cbookingForm: FormGroup;
  submitted = false;
  public CbookingFormGroup: FormGroup;
  bookingObject = this.service.formData;

  ngOnInit() {
    this.loadList();
  }
  //populating the editing stuff
  fillUP(formData: Process)
 {
   this.service.formData = formData;
 }
 
 previousForm() {
  window.history.back();
}

  loadList(){
    // this.List = this.service.getItem()
     this.bookingObject = this.service.formData;
   }

  BookingPayment(form: NgForm){
    this.service.bookingPayment(form.value).subscribe(ref => {this.loadList()});
  }

}
