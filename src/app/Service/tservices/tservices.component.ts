import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceData} from '../../API Services/for Service/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tservices',
  templateUrl: './tservices.component.html',
  styleUrls: ['./tservices.component.css']
})
export class TServicesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ServiceData>;

  displayedColumns = ['ID', 'Name','Type', 'Description', 'Price','Options', 'Edit', 'Delete'];

  constructor(public service: ServicesService, private rouuter: Router) { }
 
  ServicesList : ServiceData[];

  dataSource;
  ngOnInit() 
  {
    this.dataSource = new MatTableDataSource(this.ServicesList)
    this.loadList();
    localStorage.clear();
  }

  ngAfterViewInit()
  {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    
  }

  length = 0;
  loadList()
  {
    this.service.getServices().subscribe(res => 
      {
        this.dataSource.data = res;
      });
    
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeModal()
  {
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
  }

  ViewImage(data: ServiceData)
  {
    // Get the modal
    var modal = document.getElementById("myModal");
          
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = <HTMLImageElement>document.getElementById("img01");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = data.Image
    captionText.innerHTML = data.Name
    
    
    
    
  }

  EditService(form: ServiceData)
  {
    //this.service.ServicesData = form;
    localStorage.setItem("sEdit", JSON.stringify(form))
    this.rouuter.navigateByUrl("/services/EditService")
  }

  AddService()
  {
    //this.service.ServicesData = null;
    localStorage.removeItem("sEdit")
    this.rouuter.navigateByUrl("/services/EditService")
  }

  DeleteService(form: ServiceData)
  {
    //this.service.ServicesData = form;
    localStorage.setItem("sDelete", JSON.stringify(form))
    this.rouuter.navigateByUrl("/services/DeleteService")
  }

  
}
