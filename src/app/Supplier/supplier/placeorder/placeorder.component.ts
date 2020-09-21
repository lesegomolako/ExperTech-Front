import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog'; 
import { SupplierOrderData } from '../../../API Services/for Supplier/sales';
import {SupplierService} from '../../../API Services/for Supplier/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierComponent } from '../supplier.component';



@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SupplierOrderData>;

  
  
  value = 'Clear me'; 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['OrderID', 'Supplier', 'Description', 'Total items', 'Price', 'Date', 'ReturnOrder'];
  dialog: any;
  searchKey: string;


  constructor(public service: SupplierService){}

  SupplierOrderList: SupplierOrderData[];
  dataSource = new MatTableDataSource(this.SupplierOrderList)

  ngOnInit() {
    this.service.getSupplierOrderList().subscribe(res => 
      {
        this.SupplierOrderList = res;
        this.dataSource.data = this.SupplierOrderList;
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate(){
    this.dialog.open(SupplierComponent)
  }
  
  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(OrderID: any)
  {
    this.service.DeleteSupplierOrder(OrderID);
    this.service.getSupplierOrderList().subscribe(res => 
      {
        this.SupplierOrderList = res;
        this.dataSource.data = this.SupplierOrderList;
      })
  }
  
}

