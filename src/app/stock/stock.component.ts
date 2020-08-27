import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { StockService } from '../stock.service';
import { StockData } from '../stock.service.spec';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AddstockComponent } from './addstock/addstock.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StockData>;

  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description' , 'price' , 'quantityinstock', 'edit', 'delete'];
  dialog: any;
  searchKey: string;
  StockData: any;

  constructor(public service: StockService, private router: Router){}

  StockList: StockData[];
  dataSource = new MatTableDataSource(this.StockList)

  ngOnInit() {
    this.service.getStockList().subscribe(res => 
      {
        this.StockList = res;
        this.dataSource.data = this.StockList;
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate(){
    this.dialog.open(StockComponent)
  }

  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(ItemID: any)
  {
    this.service.DeleteStockItem(ItemID);
  }

  EditStock(StockData)
{
  //this.service.stocksData = form;
  localStorage.setItem('stock', JSON.stringify(StockData))
  this.router.navigateByUrl("/editstock")
}
}

  

