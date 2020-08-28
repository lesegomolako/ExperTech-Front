import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import {ServiceOptionData} from '../../API Services/for Service/services';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-service-options',
  templateUrl: './service-options.component.html',
  styleUrls: ['./service-options.component.css']
})
export class ServiceOptionsComponent implements OnInit {

  constructor(public service: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.loadList();
  }

  myServiceOptionsList : Observable<ServiceOptionData[]>;

  loadList()
  {
    this.myServiceOptionsList = this.service.getServiceOptions();
  }

  AddServiceOption()
  {
    this.service.OptionData = null;
    this.router.navigateByUrl("services/EditServiceOption");
  }

  EditServiceOption(data: ServiceOptionData)
  {
    this.service.OptionData = data;
    this.router.navigateByUrl("services/EditServiceOption");
  }

  DeleteServiceOption(data: ServiceOptionData)
  {
    this.service.OptionData = data;
    this.router.navigateByUrl("services/DeleteServiceOption");
  }
}
