import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import {ServiceOptionData} from '../../API Services/for Service/services';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-service-options',
  templateUrl: './service-options.component.html',
  styleUrls: ['./service-options.component.css']
})
export class ServiceOptionsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ServiceOptionData>;

  displayedColumns = ['ID', 'Name','Duration', 'Edit', 'Delete'];
  dataSource;
  constructor(public service: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.myServiceOptionsList)
    this.loadList();
    localStorage.clear();
  }

  myServiceOptionsList : ServiceOptionData[];

  loadList()
  {
    this.service.getServiceOptions().subscribe(res => 
      {
        this.dataSource.data = res;
      });
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

  AddServiceOption()
  {
    //this.service.OptionData = null;
    localStorage.clear();
    this.router.navigateByUrl("services/EditServiceOption");
  }

  EditServiceOption(data: ServiceOptionData)
  {
    //this.service.OptionData = data;
    localStorage.setItem('soEdit', JSON.stringify(data))
    this.router.navigateByUrl("services/EditServiceOption");
  }

  DeleteServiceOption(data: ServiceOptionData)
  {
    //this.service.OptionData = data;
    localStorage.setItem('soDelete', JSON.stringify(data))
    this.router.navigateByUrl("services/DeleteServiceOption");
  }
}
