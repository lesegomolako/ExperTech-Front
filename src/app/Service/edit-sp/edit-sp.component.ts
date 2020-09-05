import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { ServiceData } from 'src/app/API Services/for Service/services';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-sp',
  templateUrl: './edit-sp.component.html',
  styleUrls: ['./edit-sp.component.css']
})
export class EditSPComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private fb: FormBuilder) { }
  ServiceList = this.service.getServices()
  PackageForm: FormGroup;
  PackageObject;

  ngOnInit(): void {

    
    console.log(this.ServiceList)
    this.PackageForm = this.fb.group({
      serviceid: new FormControl(),
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      duration: ['', Validators.required]
    })
  }

  Cancel()
  {
    window.history.back();
  }

  Save(packageForm)
  {
    this.PackageObject = packageForm.value
    //console.log(packageForm)
    this.service.AddServicePackage(this.PackageObject).subscribe(res => {
      if (res =="success")
      {
        alert("Successfully saved")
        this.router.navigateByUrl("services/ServicePackages")
      }
      else if(res =="duplicate")
      {
        alert("ServicePackage already exists. Redirecting to Service Package")
        this.router.navigateByUrl("services/ServicePackages")
      }
    })
  }

  mapValues(packageForm)
  {
    this.PackageObject.ServiceID = packageForm.supplierid;
    this.PackageObject.Description = this.PackageForm.value.description;
    this.PackageObject.Price = this.PackageForm.value.price;
    this.PackageObject.Quantity = this.PackageForm.value.quantity;
    this.PackageObject.Duration = this.PackageForm.value.duration;
  }


}
