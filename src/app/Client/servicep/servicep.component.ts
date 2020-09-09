import { Component, OnInit } from '@angular/core';
import { ClientPackage } from '../../API Services/for Booking/client';
import {Observable} from 'rxjs'
import { FormBuilder } from '@angular/forms';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { Router } from '@angular/router'; 
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-servicep',
  templateUrl: './servicep.component.html',
  styleUrls: ['./servicep.component.sass']
})


export class ServicepComponent implements OnInit {
  
  dataSaved = false;  
  packageForm: any;  
  allservicepackage: Observable<ClientPackage[]>;
  total: 0;
  

    
 
  massage = null; 

  constructor(private service:ExperTexhService,private router:Router, private formbulider: FormBuilder) { }

  ngOnInit(): void {
    this.packageForm = this.formbulider.group;
    this.loadservicepackage();  

}

loadservicepackage() {  
  this.allservicepackage = this.service.ViewServicePackage();
}

}
