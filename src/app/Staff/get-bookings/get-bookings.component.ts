import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';

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
  
  searchKey: string;


  constructor(public api: ExperTexhService,public dialog: MatDialog, private http: HttpClient, private router: Router){}

  BookingsList: BookingData[];
  dataSource;

  ngOnInit() {
    if(this.api.RoleID == "2")
    {
      this.dataSource = new MatTableDataSource()
      this.http.get<BookingData[]>(this.api.url + "Admin/GetBookings").subscribe((res:BookingData[]) => {this.dataSource.data = res});
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
    //console.log(this.BookingsList)
    
  }

  openDialog(): void {

    
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
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

  makePayment(form: BookingData)
  {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.width = '500px';
    dialogConfig.height = '300px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 
    { 
      BookingID: form.BookingID,
      Client: form.Client,
      Status: form.Status,
      Date: form.Date,
      Service: form.Service,
      Price: form.Price
    }
  
    const dialogRef = this.dialog.open(CbookingDialog, dialogConfig);
  
    // dialogRef.afterClosed().subscribe((res:any) => {
    //   console.log('The dialog was closed');
      
    // });
    //localStorage.setItem("bookingPayment", JSON.stringify(form))
    //this.router.navigate(["cbooking"])
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

import {Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportingService } from '../../API Services/for User/reporting.service';
import { state } from '@angular/animations';


@Component({
  selector: 'app-cbooking',
  templateUrl: './cbooking.component.html'
  // styleUrls: ['./cbooking.component.sass']
})
export class CbookingDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CbookingDialog>,
    private router: Router,
    public service: ReportingService,
    private http: HttpClient,
    private api: ExperTexhService,
    @Inject(MAT_DIALOG_DATA) public data: BookingData
  ) { }

  List: any;
  cbookingForm: FormGroup;
  submitted = false;
  bookingObject : BookingData;
  type: any;
  state: RouterStateSnapshot;

  ngOnInit() 
  {
    this.List = this.service.getPaymentType();
    this.bookingObject = this.data;
  }


onSubmit()
{
  const payDetails =
  {
    BookingID: this.bookingObject.BookingID,
    PaymentTypeID: this.type,
    Price: this.bookingObject.Price  ,
    SessionID: this.api.SessionID 
  }

  

  this.service.bookingPayment(payDetails).subscribe((res:any) =>
    {
      if(res == "success")
      {
        alert("Booking successfully paid")
        this.dialogRef.close();
      }
      else if(res.Error == "session")
      {
        alert("res.Message")
      }
      else
      {
        alert("Session is no longer valid. User needs to login")
        this.router.navigate(["login"],{queryParams:{'redirectURL':this.state.url}})
      }
    }
  );
  console.log(payDetails)
}
  


}






