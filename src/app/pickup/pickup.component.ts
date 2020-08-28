import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from '../services.service';
import { Observable } from 'rxjs';
import { ServiceData } from '../services';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ServicesService
  ) { }

  List: Observable<ServiceData[]>
  pickupForm: FormGroup;
  submitted = false;
  public PickupFormGroup: FormGroup;
  productObject = this.service.formData;

  ngOnInit(): void {
  }
  SalePayment(form: NgForm){
    this.service.salePayment(form.value).subscribe(ref => {this.loadList()});
  }
  previousForm() {
    window.history.back();
  }
  loadList(){
    // this.List = this.service.getItem()
     this.productObject = this.service.formData;
   }
  
}
