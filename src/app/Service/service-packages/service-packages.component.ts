import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../API Services/for Service/services.service';
import { PackageData} from '../../API Services/for Service/services'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.css']
})
export class ServicePackagesComponent implements OnInit {

  constructor(private router: Router, public service: ServicesService) { }

  

  ngOnInit(): void {
    this.loadList();
  }

  myServicePackageList : Observable<PackageData[]>;

  loadList()
  {
    this.myServicePackageList = this.service.getServicePackages();
  }

  AddServicePackage()
  {
    this.service.PackageData = null;
    this.router.navigateByUrl("services/CreateServicePackage");
  }



  Delete(PackageID: any)
  {
    if(confirm("Are you sure you want to delete?"))
    {
      this.service.DeleteServicePackage(PackageID).subscribe(
        res => {
          if(res == "success")
          {
            alert("Successfully deleted")
          }
        }
      )
    }
  }
}


