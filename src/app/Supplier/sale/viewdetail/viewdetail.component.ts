import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../API Services/for Supplier/sale.service';
import { Router } from '@angular/router';
//import { ReportingService } from '../../API Services/for User/reporting.service';
//import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-viewdetail',
  templateUrl: './viewdetail.component.html',
  styleUrls: ['./viewdetail.component.css']
})
export class ViewdetailComponent implements OnInit {

  constructor(public service: SaleService, private router: Router) { }

  clientObject = JSON.parse(localStorage.getItem('sale'))


  ngOnInit(): void {
  }

}


