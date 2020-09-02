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
  ServiceList: Observable<ServiceData[]>
  PackageForm: FormGroup;

  ngOnInit(): void {

    this.ServiceList = this.service.getServices();

    this.PackageForm = this.fb.group({
      serviceid: new FormControl(),
      name: ["", Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      duration: ['', Validators.required]
    })
  }

  Cancel()
  {
    window.history.back();
  }

  Save()
  {
    //this.mapValues()
    //alert("Successfully saved")
    confirm("Service Package already exists/ Would you like to view the package?")
    //confirm("Service Type already exists. Would you like to update instead?")
    //confirm("Information has not been changed. Would you like to re-enter details?");
    //alert("Successfully updated");
  }


}
