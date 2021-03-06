import { AfterViewInit, Component,ChangeDetectorRef , OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { StockService } from '../../API Services/for Supplier/stock.service';
import { StockData } from '../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AddstockComponent } from './addstock/addstock.component';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StockData>;

  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'category', 'price' , 'quantityinstock', 'edit', 'delete'];
  dialog: any;
  searchKey: string;
  StockData: any;

  constructor(public service: StockService, private api: ExperTexhService, private snack: MatSnackBar,
    private router: Router){}

  StockList: StockData[];
  dataSource;
  ngOnInit() {
    if(this.api.RoleID == "2")
    {
      this.dataSource = new MatTableDataSource(this.StockList)
      this.loadList()
      
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  loadList()
  {
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

  goBack()
  {
    window.history.back();
  }

  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(ItemID: any): void
  {
    if(confirm("Are you sure you want to delete this item"))
    {
      console.log(ItemID)
      this.service.DeleteStockItem(ItemID, this.api.SessionID).subscribe((res:any) =>
        {
          if(res =="success")
          {
            this.snack.open("Stock Item successfully deleted", "OK", {duration: 3000})
            window.location.reload();
          }
          else if(res.Error == "dependencies")
          {
              alert(res.Message);
              //window.location.reload();
          }
          else
          {
            console.log(res)
            this.snack.open("Something went wrong. Please try again later", "OK", {duration: 3000})
          }
        }, error => { console.log(error), this.snack.open("Something went wrong. Please try aganin later", "OK", {duration:3000})})
    }
  }

  EditStock(StockData)
{
  //this.service.stocksData = form;
  localStorage.setItem('stock', JSON.stringify(StockData))
  this.router.navigateByUrl("/editstock")
}
}

  

