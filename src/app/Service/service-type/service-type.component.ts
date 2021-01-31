import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceTypeData} from '../../API Services/for Service/services'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ServiceTypeData>;

  displayedColumns = ['ID', 'Name', 'Edit', 'Delete'];
  dataSource;
  constructor(public service: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.myServiceTypesList)
    this.loadList();
  }

  myServiceTypesList : ServiceTypeData[];

  loadList()
  {
    this.service.getServiceTypes().subscribe(res => 
      {
        this.myServiceTypesList = res;
        this.dataSource.data = this.myServiceTypesList;
      }
    );
  }

  ngAfterViewInit()
  {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // myFunction(event: any) {
  //   //declare variables

  //   var input, filter, table, tr, td, r, txtValue, th;
  //   input = document.getElementById('myInput');
  //   filter = input.value.toUpperCase();
  //   table = document.getElementById('myTable');
  //   tr = table.getElementsByTagName('tr');
  //   th = table.getElementsByTagName('th');

  //   //loop through all table rows and hide those who dont match search query
  //   var lis = document.getElementsByTagName('li');
  //   for (var i = 0; i < lis.length; i++) {
  //       var name = lis[i].getElementsByClassName('name')[0].innerHTML;
  //       if (name.toUpperCase().indexOf(filter) == 0) 
  //           lis[i].style.display = 'list-item';
  //       else
  //           lis[i].style.display = 'none';
  //   }
  // }

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
