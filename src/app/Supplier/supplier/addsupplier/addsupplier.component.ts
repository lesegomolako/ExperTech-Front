import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgModel} from '@angular/forms'
import { FormGroup } from '@angular/forms';
import { SupplierService } from '../../../API Services/for Supplier/supplier.service';
import { Router } from '@angular/router';
import { SupplierData } from '../../../API Services/for Supplier/sales';
import { Observable } from 'rxjs';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';


@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.css']
})
export class AddsupplierComponent implements OnInit {


 emailFormControl = new FormControl('', [Validators.required, Validators.email]);
 

  constructor(
    private formBuilder: FormBuilder, 
    private service: SupplierService,
    private route: Router,
    private api: ExperTexhService
    ) {}

  suppliers: SupplierData;
  public AddForm: FormGroup;
  submitted = false;

  List: Observable<SupplierData[]>;

  loadList() {
    this.List = this.service.getSupplierList();
  }

  
  ngOnInit(){
    if(this.api.RoleID == "2")
    {
      this.AddForm = this.formBuilder.group({
        name: ['', Validators.required, Validators.maxLength(20)],
        contactno: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        email:  new FormControl('', [Validators.required, Validators.email]),
        address: ['', Validators.required]
      })
    }
    else
    {
      this.route.navigate(["403Forbidden"])
    }
  }

  get f() { return this.AddForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.AddForm.invalid) {
        return;
    }
  }

    public hasError = (controlName: string, errorName: string) =>{
      return this.AddForm.controls[controlName].hasError(errorName);
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


AddSupp(supplier)
{
  this.service.AddSupplier(supplier.value, this.api.SessionID)
  .subscribe(res => {
    if (res =="success")
    {
      alert("Successfully added")
      this.route.navigateByUrl("/supplier")
    }
  })
//   const xx = this.AddForm.get('name').value;
//   console.log(xx)
// let suppliers = [];
// if (localStorage.getItem('supplier')) {
//   suppliers = JSON.parse(localStorage.getItem('supplier'));
//   suppliers = [supplier, ...suppliers];
// }
// localStorage.setItem('supplier', JSON.stringify(supplier));

}
}

