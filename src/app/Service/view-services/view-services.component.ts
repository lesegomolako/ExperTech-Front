import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { ServiceTypeData } from 'src/app/API Services/for Service/services';
import { ServicesService } from 'src/app/API Services/for Service/services.service';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.css']
})
export class ViewServicesComponent implements OnInit {

  constructor(private service: ServicesService, private api: ExperTexhService) { }
  ServicesList : Observable<ServiceTypeData[]>;
  RoleID;

  ngOnInit() 
  {
    this.RoleID = this.api.RoleID;
    this.loadList();
  }

  loadList()
  {
    this.ServicesList = this.service.ViewServices();
  }

}
