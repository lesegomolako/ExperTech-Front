import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceData } from 'src/app/API Services/for Service/services';
import { ServicesService } from 'src/app/API Services/for Service/services.service';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.css']
})
export class ViewServicesComponent implements OnInit {

  constructor(private service: ServicesService) { }
  ServicesList : Observable<ServiceData[]>;

  ngOnInit() 
  {
    this.loadList();
  }

  loadList()
  {
    this.ServicesList = this.service.getServices();
  }

}
