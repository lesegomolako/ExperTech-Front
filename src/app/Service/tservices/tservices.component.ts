import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceData} from '../../API Services/for Service/services';

@Component({
  selector: 'app-tservices',
  templateUrl: './tservices.component.html',
  styleUrls: ['./tservices.component.css']
})
export class TServicesComponent implements OnInit {

  constructor(public service: ServicesService, private rouuter: Router) { }
 
  ServicesList : Observable<ServiceData[]>;

  ngOnInit() 
  {
    this.loadList();
    localStorage.clear();
  }

  loadList()
  {
    this.ServicesList = this.service.getServices();
  }

  EditService(form: ServiceData)
  {
    //this.service.ServicesData = form;
    localStorage.setItem("sEdit", JSON.stringify(form))
    this.rouuter.navigateByUrl("/services/EditService")
  }

  AddService()
  {
    //this.service.ServicesData = null;
    localStorage.removeItem("sEdit")
    this.rouuter.navigateByUrl("/services/EditService")
  }

  DeleteService(form: ServiceData)
  {
    //this.service.ServicesData = form;
    localStorage.setItem("sDelete", JSON.stringify(form))
    this.rouuter.navigateByUrl("/services/DeleteService")
  }

  
}
