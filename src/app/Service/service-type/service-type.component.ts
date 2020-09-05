import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceTypeData} from '../../API Services/for Service/services'

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit {

  constructor(public service: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.loadList();
  }

  myServiceTypesList : Observable<ServiceTypeData[]>;

  loadList()
  {
    this.myServiceTypesList = this.service.getServiceTypes();
  }

  AddServiceType()
  {
    //this.service.TypeData = null;
    localStorage.removeItem('stEdit')
    this.router.navigateByUrl("services/EditServiceType");
  }

  EditServiceType(data: ServiceTypeData)
  {
    //this.service.TypeData = data;
    localStorage.setItem('stEdit', JSON.stringify(data))
    this.router.navigateByUrl("services/EditServiceType")
  }

  DeleteServiceType(data: ServiceTypeData)
  {
    //this.service.TypeData = data;
    localStorage.setItem("stDelete", JSON.stringify(data))
    this.router.navigateByUrl("services/DeleteServiceType")
  }
}
