import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { SaleService } from '../../API Services/for Supplier/sale.service';
import { SaleData } from '../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CbookingDialog } from 'src/app/Staff/get-bookings/get-bookings.component';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/API Services/for Booking/client';
//import { ReportingService } from '../../API Services/for User/reporting.service';
//import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})



export class SaleComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SaleData>;


  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['saleid', 'client', 'saletype', 'status', 'payment', 'paymenttype', 'date', 'reminder', 'viewdetail', 'pickup', 'cancel'];
  
  searchKey: string;
  SaleData: any;


  constructor(public service: SaleService, private router: Router, private dialog: MatDialog,
    private api: ExperTexhService, private snack: MatSnackBar) { }

  SaleList: SaleData[];
  dataSource;
  sale;


  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.dataSource = new MatTableDataSource(this.SaleList)
      this.service.getSaleList().subscribe(res => {
        this.SaleList = res;
        this.dataSource.data = this.SaleList;
      })

      this.api.getProfile().subscribe((res: User) => { this.isOwner = res.Admins[0].Owner })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }



  }

  PickUp(sale: SaleData) {
    localStorage.setItem("PickSale", JSON.stringify(sale))
    this.router.navigate(["salepayment"])
  }

  isOwner = false;
  CancelSale(SaleID) {

    if (confirm("Are you sure you want to cancel this sale?")) 
    {
      if (this.isOwner == true) {
        this.service.CancelSale(this.api.SessionID, SaleID)
          .subscribe((ref: any) => {
            if (ref == "success") {
              this.snack.open("Sale successfully cancelled", "OK", { duration: 3000 })
              window.location.reload()
            }
            else if (ref.Error == "session") {
              alert(ref.Message);
            }
            else {
              console.log(ref)
            }
          }, error => { console.log(error), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
      }
      else {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = '400px';
        dialogConfig.height = '300px';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;


        const dialogRef = this.dialog.open(CbookingDialog, dialogConfig);

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res.Status == true) {
            this.service.CancelSale(this.api.SessionID, SaleID, res.OwnerID)
              .subscribe((ref: any) => {
                if (ref == "success") {
                  this.snack.open("Sale successfully cancelled", "OK", { duration: 3000 })
                  window.location.reload()
                }
                else if (ref.Error == "session") {
                  alert(ref.Message);
                }
                else {
                  console.log(ref)
                }
              }, error => { console.log(error), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
          }
        })
      }
    }
  }


  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  onCreate() {
    this.dialog.open(SaleComponent)
  }

  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ViewDetails(SaleData) {
    //this.service.stocksData = form;
    localStorage.setItem('sale', JSON.stringify(SaleData))
    this.router.navigateByUrl("/viewdetail")
  }



}






