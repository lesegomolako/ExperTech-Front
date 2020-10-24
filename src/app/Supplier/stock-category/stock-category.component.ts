import { AfterViewInit, Inject, Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { StockService } from '../../API Services/for Supplier/stock.service';
import { StockCategory, StockData } from '../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-stock-category',
  templateUrl: './stock-category.component.html',
  styleUrls: ['./stock-category.component.css']
})
export class StockCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StockData>;

  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'name', 'edit', 'delete'];
  
  searchKey: string;
  StockData: any;

  constructor(public service: StockService, private api: ExperTexhService, private snack: MatSnackBar,
    private router: Router, private dialog: MatDialog) { }

  CategoryList: StockCategory[];
  dataSource;
  ngOnInit() {
    if (this.api.RoleID == "2") {
      this.dataSource = new MatTableDataSource(this.CategoryList)
      this.loadList()

    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  loadList() {
    this.service.getStockCategory().subscribe(res => {
      this.CategoryList = res;
      this.dataSource.data = this.CategoryList;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  goBack() {
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

  onDelete(CategoryID: any): void {
    if (confirm("Are you sure you want to delete this category")) {
      this.service.DeleteStockCategory(CategoryID, this.api.SessionID).subscribe((res: any) => {
        if (res == "success") {
          this.snack.open("Category successfully deleted", "OK", {duration: 3000})
          window.location.reload();
        }
        else if(res.Error == "dependencies")
        {
          alert(res.Message)
        }
        else if(res.Error == "duplicate")
        {
          alert(res.Message);
          window.location.reload();
        }
      })
    }
  }

  

  EditCategory(data?) {

    const dialogConfig = new MatDialogConfig;
    dialogConfig.width = "400px";
    dialogConfig.height = "250px";
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(StockCategoryDialog,dialogConfig)

    // dialogRef.afterClosed().subscribe((res: any) => {
    //   window.location.reload();
    // })
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit-category.component.html',
})
export class StockCategoryDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StockCategoryDialog>, private fb: FormBuilder, private api: ExperTexhService,
    @Inject(MAT_DIALOG_DATA) public data: StockCategory,  private service: StockService, private snack: MatSnackBar
    ) { }

  title;
  categoryForm: FormGroup;

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryid: null,
      name: ['', [Validators.required, Validators.maxLength(50)]]
    })

    console.log(this.data)
    if (this.data == null) {
      this.title = "Add Stock Category"; 
    }
    else {
      this.title = "Edit Stock Category"
      this.categoryForm.patchValue({
        categoryid: this.data.CategoryID,
        name: this.data.Name
      })
    }
  }

  get f()
  {
    return this.categoryForm.controls;
  }

  onSubmit(form)
  {
    if(form.categoryid == null )
    {
      this.service.AddStockCategory(form, this.api.SessionID).subscribe((res:any) =>
        {
          if(res =="success")
          {
            this.snack.open("Category successfully added", "OK", {duration:3000})
            this.dialogRef.close();
            window.location.reload();
          }
          else if(res.Error == "duplicate")
          {
            alert("This category aleady exists")
            this.dialogRef.close()
          }
          else if(res.Error == "session")
          {
            alert(res.Message)
          }
        }, error => {console.log(error), this.snack.open("Something went wrong", "OK", )}
      )
    }
    else
    {
      this.service.EditStockCategory(form, this.api.SessionID).subscribe((res:any) =>
        {
          if(res =="success")
          {
            this.snack.open("Category successfully added", "OK", {duration:3000})
            this.dialogRef.close();
            window.location.reload();
          }
          else if(res == "invalid")
          {
            alert("Details are invalid")
            this.dialogRef.close()
          }
          else if(res.Error == "session")
          {
            alert(res.Message)
            this.dialogRef.close();
          }
        }, error => {console.log(error), this.snack.open("Something went wrong. Please try again later", "OK", {duration: 3000})}
      )
    }
  }

}