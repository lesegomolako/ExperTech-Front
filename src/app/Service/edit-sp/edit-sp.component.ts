import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { ServiceData } from 'src/app/API Services/for Service/services';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-edit-sp',
  templateUrl: './edit-sp.component.html',
  styleUrls: ['./edit-sp.component.css']
})
export class EditSPComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private fb: FormBuilder, private snack: MatSnackBar, private api: ExperTexhService) { }
  ServiceList = this.service.getServices()
  PackageForm: FormGroup;
  PackageObject;

  ngOnInit(): void {

    if (this.api.SessionID == "2") {


      this.PackageForm = this.fb.group({
        serviceid: new FormControl(Validators.required),
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        quantity: ['', [Validators.required, Validators.min(0), Validators.max(15)]],
        duration: ['', [Validators.required, Validators.min(0), Validators.max(3)]]
      })

      this.PackageForm.valueChanges.subscribe(res => {
        this.logValidationErrors(this.PackageForm)
      })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  validationMessages =
    {
      'serviceid': { 'required': 'A Service must be selected' },
      'description':
      {
        'required': 'Description field is required',
      },
      'duration': { 'required': 'Duration field is required', 'max': 'A maximum of 3 months may be selected' },
      'quantity': { 'required': 'Quantity field must be selected', 'max': 'A maximum of 15 uses may be selected' },
      'price': { 'required': 'Price field is required' },
    }

  formErrors =
    {
      'serviceid': '',
      'description': '',
      'duration': '',
      'quantity': '',
      'price': '',
    }

  logValidationErrors(group: FormGroup = this.PackageForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key)
      if (abstractControl instanceof FormGroup) { this.logValidationErrors(abstractControl) }
      else {
        this.formErrors[key] = ''
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key]
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
              console.log(errorKey)
            }
          }
        }
      }
    })
  }

  Cancel() {
    window.history.back();
  }

  Save(packageForm) {
    this.PackageObject = packageForm.value
    //console.log(packageForm)
    this.service.AddServicePackage(this.PackageObject, this.api.SessionID).subscribe(res => {
      if (res == "success") {
        this.snack.open("Service Package successfully created", "OK", {duration:3000})
        this.router.navigateByUrl("services/ServicePackages")
      }
      else if (res == "duplicate") {
        alert("ServicePackage already exists. Redirecting to Service Package")
        this.router.navigateByUrl("services/ServicePackages")
      }
    })
  }

  mapValues(packageForm) {
    this.PackageObject.ServiceID = packageForm.supplierid;
    this.PackageObject.Description = this.PackageForm.value.description;
    this.PackageObject.Price = this.PackageForm.value.price;
    this.PackageObject.Quantity = this.PackageForm.value.quantity;
    this.PackageObject.Duration = this.PackageForm.value.duration;
  }


}
