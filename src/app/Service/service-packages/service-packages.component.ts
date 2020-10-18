import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../API Services/for Service/services.service';
import { PackageData} from '../../API Services/for Service/services'
import {Observable} from 'rxjs'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.css']
})
export class ServicePackagesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PackageData>;

  displayedColumns = ['ID', 'Name','Price','Quantity', 'Delete'];
  dataSource;
  constructor(private router: Router, public service: ServicesService) { }

  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.myServicePackageList)
    this.loadList();
  }

  myServicePackageList : PackageData[];

  loadList()
  {
    this.service.getServicePackages().subscribe(res => {
      this.dataSource.data = res
    });
  }

  ngAfterViewInit()
  {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
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


