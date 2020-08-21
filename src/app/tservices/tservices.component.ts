import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceData} from '../services';

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
}
