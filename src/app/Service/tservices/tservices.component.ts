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
  }

  loadList()
  {
    this.ServicesList = this.service.getServices();
  }

  EditService(form: ServiceData)
  {
    this.service.ServicesData = form;
    this.rouuter.navigateByUrl("/services/EditService")
  }

  AddService()
  {
    this.service.ServicesData = null;
    this.rouuter.navigateByUrl("/services/EditService")
  }

  DeleteService(form: ServiceData)
  {
    this.service.ServicesData = form;
    this.rouuter.navigateByUrl("/services/DeleteService")
  }

  
}
