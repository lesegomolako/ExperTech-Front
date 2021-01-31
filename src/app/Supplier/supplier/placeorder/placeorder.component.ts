import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierOrderData } from '../../../API Services/for Supplier/sales';
import { SupplierService } from '../../../API Services/for Supplier/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierComponent } from '../supplier.component';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SupplierOrderData>;



  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['OrderID', 'Supplier', 'Total items', 'Price', 'Date', 'viewdetail', 'ReturnOrder', 'ReceiveStock', 'Regenerate'];
  searchKey: string;


  constructor(public service: SupplierService, public dialog: MatDialog, private snack: MatSnackBar,
    private api: ExperTexhService, private router: Router) { }

  SupplierOrderList: SupplierOrderData[];
  dataSource;

  ngOnInit() {
    if (this.api.RoleID == "2") {
      this.dataSource = new MatTableDataSource(this.SupplierOrderList)
      this.service.getSupplierOrderList().subscribe(res => {
        this.SupplierOrderList = res;
        this.dataSource.data = this.SupplierOrderList;
      })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  ReceiveStock(data: SupplierOrderData) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '700px';
    dialogConfig.data = data;

    this.dialog.open(ReceiveDialog, dialogConfig);

  }

  RegenerateOrder(data: SupplierOrderData) {
    if (confirm("Would you like to re-generate this supplier order?")) {
      this.service.RegenerateOrder(data, this.api.SessionID).subscribe((res: any) => {
        if (res == "success") {
          this.snack.open("Supplier order successfully regenerated", "OK", { duration: 3000 })
          window.location.reload();
        }
        else
        {
          this.snack.open("Something went wrong. Please try again later", "OK", {duration: 4000})
          console.log(res)
        }

      }, error => {console.log(error), this.snack.open("Something went wrong. Please try again later", "OK", {duration: 4000})})
    }
  }


  ViewOrder(data: SupplierOrderData) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.data = data;

    this.dialog.open(OrderDialog, dialogConfig);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate() {
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

  onDelete(OrderID: any) {
    if (confirm("Are you sure you want to return this order?")) {
      this.service.DeleteSupplierOrder(OrderID, this.api.SessionID).subscribe(res => {
        if (res == "success") {
          this.snack.open("Order succesfully cancelled", "OK", { duration: 3000 })
          this.service.getSupplierOrderList().subscribe(res => {
            this.SupplierOrderList = res;
            this.dataSource.data = this.SupplierOrderList;
          })
          window.location.reload();
        }
        else {

        }
      });
    }

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
      <div class="row">
        <div class="col-5">
          <strong>Supplier: </strong>{{ data.Supplier }}
        </div>
        <div class="col-6">
          <strong>Date Ordered: </strong>{{ data.Date | date:"dd/MM/yy, hh:mm"}}
        </div>
      </div>
      <br>           
      <p>
      <strong>Order Total: </strong>R{{ data.Price }}
      </p>
      <strong>Stock Items: </strong>
        <ul *ngFor="let x of data.StockItemLines">
          <li>{{ x.Items}} (Quantity: {{x.Quantity}}) Price: {{x.Price}}</li>
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
export class OrderDialog {
  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierOrderData) { }
}

@Component({
  selector: "receive-dialog",
  templateUrl: "receive-stock.html",
  styles: []
})
export class ReceiveDialog implements OnInit {
  ReceiveForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReceiveDialog>, private fb: FormBuilder, private service: SupplierService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: SupplierOrderData, private api: ExperTexhService, private snack: MatSnackBar) {

  }

  ngOnInit() {
    this.ReceiveForm = this.fb.group({
      orderid: this.data.OrderID,
      stockitemlines: this.fb.array([

      ])
    })

    this.ReceiveForm.setControl('stockitemlines', this.setOrder(this.data));
    this.ReceiveForm.updateValueAndValidity();
  }

  get f(): FormArray {
    return this.ReceiveForm.get('stockitemlines') as FormArray;
  } 

  setOrder(res: SupplierOrderData): FormArray {
    const formArray = new FormArray([]);

    res.StockItemLines.forEach((s, i )=> {
      formArray.push(
        this.fb.group({
          LineID: s.LineID,
          Quantity: s.Quantity,
          Size: s.Size,
          Items: s.Items,
          QuantityReceived: null,
        })
      )
      
      //var group = this.ReceiveForm.get('stockitemlines') as FormArray

      formArray.at(i).get('QuantityReceived').setValidators([Validators.required, Validators.max(s.Quantity), Validators.min(0)])
    }
    )

    return formArray;
  }

  omit_special_num_char(event) {
    var theEvent = event || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  ReceiveStock() {
    if (this.ReceiveForm.invalid) {
      this.ReceiveForm.markAllAsTouched();
      alert("Fill in all the required details")
      return;
    }

    const Receive =
    {
      OrderID: this.ReceiveForm.value.orderid,
      StockItemLines: this.ReceiveForm.value.stockitemlines
    }


    this.service.ReceiveStock(Receive, this.api.SessionID).subscribe((res:any) => {
      if (res.Success == "success") {
        if(res.BackOrder)
        {
          alert(res.BackOrder)
        }
        this.snack.open("Stock successfully received", "OK", { duration: 3000 })
        this.dialogRef.close();
        this.router.navigate(["stock"])
      }
      else if (res == "invalid") {
        this.snack.open("Save details invalid", "OK", { duration: 3000 })
        this.dialogRef.close();
        window.location.reload();
      }
      else {
        alert(res)
        this.dialogRef.close();
        window.location.reload();
      }
    })
  }
}