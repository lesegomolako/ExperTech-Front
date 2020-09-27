import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { SupplierService } from '../../API Services/for Supplier/supplier.service';
import { SupplierData } from '../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SupplierData>;

  value = 'Clear me'; 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'contact', 'address', 'edit', 'delete', 'order'];
  searchKey: string;
  dialog:any;
  SupplierData: any;

  constructor(public service: SupplierService, private router: Router, private api: ExperTexhService){}

  SupplierList: SupplierData[];
  dataSource;

  ngOnInit() {

    if(this.api.RoleID = "2")
    {
      this.dataSource = new MatTableDataSource(this.SupplierList)
      this.service.getSupplierList().subscribe(res => 
        {
          this.SupplierList = res;
          this.dataSource.data = this.SupplierList;
        })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate(){
    this.dialog.open(SupplierComponent)
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

  onDelete(SupplierID: any)
  {
    this.service.DeleteSupplier(SupplierID, this.api.SessionID).subscribe((res: any) =>
      {
        if(res.Message == "success")
        {
          alert("Supplier successfully deleted")
          this.service.getSupplierList().subscribe(res => 
            {
              this.SupplierList = res;
              this.dataSource.data = this.SupplierList;
            })
          
        }
        else if(res.Error == "dependencies")
        {
          alert(res.Message)
        }
        else
        {
          alert(res.Error)
        }
      })

      

   
  }

  EditSupplier(SupplierData)
{
  //this.service.stocksData = form;
  localStorage.setItem('supplier', JSON.stringify(SupplierData))
  this.router.navigateByUrl("/editsupplier")
}

PlaceSupplierOrder(SupplierData)
{
  //this.service.stocksData = form;
  localStorage.setItem('supplier', JSON.stringify(SupplierData))
  this.router.navigateByUrl("/orderform")
}
}



