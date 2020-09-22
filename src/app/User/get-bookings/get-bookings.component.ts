import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog'; 

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Booking } from 'src/app/API Services/for Booking/client';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class BookingData
{
  BookingID: any;
  Client: string;
  Status: string;
  Date: any;
  Service: string;
  Price: any;
}

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BookingData>;

  
  
  value = 'Clear me'; 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['BookingID', 'Client', 'Service', 'Status', 'Price', 'Date'];
  dialog: any;
  searchKey: string;


  constructor(public api: ExperTexhService, private http: HttpClient, private router: Router){}

  BookingsList: BookingData[];
  dataSource;

  ngOnInit() {
    this.dataSource = new MatTableDataSource()
    this.http.get<BookingData[]>(this.api.url + "Admin/GetBookings").subscribe((res:BookingData[]) => {this.dataSource.data = res});
    
    
    //console.log(this.BookingsList)
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate(){
   // this.dialog.open(SupplierComponent)
  }
  
  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  makePayment(form)
  {
    localStorage.setItem("bookingPayment", JSON.stringify(form))
    this.router.navigate(["cbooking"])
  }

  // onDelete(OrderID: any)
  // {
  //   this.service.DeleteSupplierOrder(OrderID);
  //   this.service.getSupplierOrderList().subscribe(res => 
  //     {
  //       this.SupplierOrderList = res;
  //       this.dataSource.data = this.SupplierOrderList;
  //     })
  // }
}





