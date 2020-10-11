import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplierOrderData } from '../../../API Services/for Supplier/sales';
import {SupplierService} from '../../../API Services/for Supplier/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierComponent } from '../supplier.component';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';



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
  displayedColumns = ['OrderID', 'Supplier', 'Total items', 'Price', 'Date','viewdetail', 'ReturnOrder', 'ReceiveStock'];
  searchKey: string;


  constructor(public service: SupplierService, public dialog: MatDialog,
    private api: ExperTexhService, private router: Router){}

  SupplierOrderList: SupplierOrderData[];
  dataSource ;

  ngOnInit() {
    if(this.api.RoleID == "2")
    {
      this.dataSource = new MatTableDataSource(this.SupplierOrderList)
      this.service.getSupplierOrderList().subscribe(res => 
        {
          this.SupplierOrderList = res;
          this.dataSource.data = this.SupplierOrderList;
        })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  ReceiveStock(data: SupplierOrderData)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.data = data;

    this.dialog.open(ReceiveDialog, dialogConfig);
  }


  ViewOrder(data: SupplierOrderData)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.data = data;

    this.dialog.open(OrderDialog, dialogConfig);
    
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
    // this.service.DeleteSupplierOrder(OrderID, this.api.SessionID).subscribe(res =>
    //   {
    //     if(res == "success")
    //     {
    //       alert("Order successfully removed")
    //       this.service.getSupplierOrderList().subscribe(res => 
    //         {
    //           this.SupplierOrderList = res;
    //           this.dataSource.data = this.SupplierOrderList;
    //         })
    //     }
    //   });
    
  }
  
}

@Component({
  selector: "order-dialog",
  template: `
  <div class="modal-header" >
    <h3 mat-dialog-title><strong>Order Details</strong></h3>
    <button mat-dialog-close type="button" class="close" mat-dialog-close>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" mat-dialog-content>
    <div>
      <p>
      <strong>Supplier: </strong>{{ data.Supplier }}
      </p>
      <p>
      <strong>Price: </strong>R{{ data.Price }}
      </p>
      <strong>Stock Items: </strong>
        <ul *ngFor="let x of data.StockItemLines">
          <li>{{ x.Items}} (Quantity: {{x.Quantity}})</li>
        </ul>
    </div> 
  </div>
  <div class="modal-footer" mat-dialog-actions>
    <button type="button" class="btn btn-outline-secondary"mat-dialog-close>
      Close
    </button>
  </div>
  `
})
export class OrderDialog
{
  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierOrderData) {}
}

@Component({
  selector: "receive-dialog",
  template: `
  <div class="modal-header" >
    <h3 mat-dialog-title><strong>Receive Stock</strong></h3>
    <button mat-dialog-close type="button" class="close" mat-dialog-close>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" mat-dialog-content>
    <div>
      <p>
      <strong>Supplier: </strong>{{ data.Supplier }}
      </p>
      <form [formGroup]="ReceiveForm">
      <div formArrayName="stockitemlines">
        <div *ngFor="let x of ReceiveForm.get('stockitemlines')['controls']; let j = index" >
          <div [formGroupName]="j">
            <table class="example-full-width" cellspacing="0">
              <tr>
                <input hidden readonly  formControlName="LineID">
                <td>
                  <mat-form-field class="w-100">
                    <mat-label>Item</mat-label>
                    <input readonly matInput formControlName="Items">
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field class="example-full-width">
                    <mat-label>Quantity</mat-label>
                    <input matInput readonly formControlName="Quantity">
                  </mat-form-field>
                </td>
                <td>                   
                  <section class="example-section">
                    <mat-checkbox class="example-margin" formControlName="available">Available</mat-checkbox>           
                  </section>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </form>
      <p>
      <strong>Price: </strong>R{{ data.Price }}
      </p>
      <strong>Stock Items: </strong>
        <ul *ngFor="let x of data.StockItemLines">
          <li>{{ x.Items}} (Quantity: {{x.Quantity}})</li>
        </ul>
    </div> 
  </div>
  <div class="modal-footer" mat-dialog-actions>
    <button type="button" class="btn btn-outline-secondary"mat-dialog-close>
      Close
    </button>
  </div>
  `
})
export class ReceiveDialog implements OnInit
{
  ReceiveForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReceiveDialog>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SupplierOrderData) 
    {
     
    }

  ngOnInit()
  {
    this.ReceiveForm = this.fb.group({
      stockitemlines: this.fb.array([])
    })

    this.ReceiveForm.setControl('times', this.setOrder(this.data));
  }

  setOrder(res: SupplierOrderData): FormArray
  {
    const formArray = new FormArray([]);

    res.StockItemLines.forEach(s => {
      formArray.push(
        this.fb.group({
          LineID: s.LineID,
          Quantity: s.Quantity,
          Items: s.Items,
          QuantityReceived: '',
          Received: false,
        })
      )
    })

    return formArray;
  }
}