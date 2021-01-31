import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../API Services/for Service/services.service';
import { PackageData } from '../../API Services/for Service/services'
import { Observable } from 'rxjs'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.css']
})
export class ServicePackagesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PackageData>;

  displayedColumns = ['ID', 'Name', 'Price', 'Quantity', 'Delete'];
  dataSource;
  constructor(private router: Router, public service: ServicesService, private api: ExperTexhService, private snack: MatSnackBar) { }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    if (this.api.RoleID == "2") {
      this.dataSource = new MatTableDataSource(this.myServicePackageList)
      this.loadList();
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  myServicePackageList: PackageData[];

  loadList() {
    this.service.getServicePackages().subscribe(res => {
      this.dataSource.data = res
    });
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  AddServicePackage() {
    this.service.PackageData = null;
    this.router.navigateByUrl("services/CreateServicePackage");
  }



  Delete(PackageID: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.service.DeleteServicePackage(PackageID, this.api.SessionID).subscribe(
        (res:any) => {
          if (res == "success") {
            this.snack.open("Service Package successfully deleted", "OK", {duration:3000})
            window.location.reload();
          }
          else if(res.Error == "dependencies")
          {
            alert(res.Message)
            return;
          }
        }
      )
    }
  }
}


