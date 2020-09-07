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
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.sass']
})
export class PickupComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService
  ) { }

  List: Observable<Process[]>
  pickupForm: FormGroup;
  submitted = false;
  public PickupFormGroup: FormGroup;
  productObject = this.service.formData;

  ngOnInit(){
    this.loadList();
  }
  previousForm() {
    window.history.back();
  }
  
  //populating the diting stuff
 fillUP(formData: Process)
 {
   this.service.formData = formData;
 }

 loadList(){
   this.productObject = this.service.formData;
   this.List = this.service.getPaymentType()
 }

 SalePayment(form: NgForm){
   this.service.salePayment(form.value).subscribe(ref => {this.loadList()});
 }
}
