import { MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AfterViewInit, Component,Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { StockService } from '../../../../API Services/for Supplier/stock.service';
import { StockData, SupplierOrderData , StockItemLines} from '../../../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgForm, Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { SupplierService } from '../../../../API Services/for Supplier/supplier.service';
import { Observable } from 'rxjs';
import { SupplierData } from '../../../../API Services/for Supplier/sales';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class orderform implements OnInit {
  constructor(
    public service: StockService,
    private formBuilder: FormBuilder,
    private suppService: SupplierService,
    private http: HttpClient,private dialog: MatDialog,
    private router: Router, private snack: MatSnackBar,
    private api: ExperTexhService) { }

  orderForm: FormGroup;
  Supp: SupplierData;

  StockList: StockData[];
  SupplierList: Observable<SupplierData[]>;
  Total = 0;
  Price = 0;

  countTotal(value) {
    let g = (<FormArray>this.orderForm.get('stockitemlines'))
    this.Total = 0;

    for (var j = 0; j < g.length; j++) {
      let q = g.at(j)
      this.Total += (q.value.quantity)
    }
  }

  setPrice(price) {
    this.Price = price;
  }

  ngOnInit(): void {
    if (this.api.RoleID == "2") {
      this.Supp = JSON.parse(localStorage.getItem('supplier'))

      this.service.getStockList().subscribe(res => {
        this.StockList = res
      })



      this.SupplierList = this.suppService.getSupplierList();

      this.orderForm = this.formBuilder.group({
        supplierid: ['', Validators.required],
        //description: ['', Validators.required],
        // price: [''],
        stockitemlines: this.formBuilder.array(
          [
            this.AddStockItems()
          ]
        )
      })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }

  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator= this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }

  AddForm() {
    (<FormArray>this.orderForm.get('stockitemlines')).push(this.AddStockItems());
  }

  DeleteForm(ItemID: any): void {
    (<FormArray>this.orderForm.get('stockitemlines')).removeAt(ItemID);
  }


  AddStockItems(): FormGroup {
    return this.formBuilder.group({
      Quantity: ['', [Validators.required, Validators.min(0)]],
      ItemID: ['', Validators.required]
    })
  }


  OrderDetails: SupplierOrderData;
  mapValues()
  {

    this.OrderDetails = 
    {
      SupplierID: this.orderForm.value.supplierid,
      StockItemLines: this.orderForm.value.stockitemlines
    }
  }

  AddOrder(form) {
    if (this.orderForm.invalid) {
      alert("Enter all details")
      return;
    }

    this.mapValues()
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.data = this.OrderDetails

    const dialogRef = this.dialog.open(ConfirmOrderDialog, dialogConfig)
    // this.suppService.CreateOrder(form.value, this.api.SessionID).subscribe(ref => {
    //   if (ref == "success") {
    //     this.snack.open("Order successfuly made", "OK", { duration: 3000 })
    //     this.router.navigateByUrl("placeorder")
    //   }
    // });
  }

}


@Component({
  selector: 'confirm-order-dialog',
  template: `
    <div class="modal-header" >
    <h3 mat-dialog-title><strong>Confirm Supplier Order Details</strong></h3>
    <button mat-dialog-close type="button" class="close" mat-dialog-close>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" mat-dialog-content>
    <div>
      <div><p><strong>Order Details:</strong></p></div>
      <div>
        Supplier: {{ Display?.Supplier }}
      </div>
      <div>
        <br>
        <p>Stock Items:</p>
        <ul>
          <li *ngFor="let x of Display?.StockItemLines">{{x.Items + '(x'+ x.Quantity + ')'}}  {{'Price: ' + x.Price }}</li>
        </ul>
      </div>
    </div>
    <div style="float:right">
      <mat-form-field class="example-full-width">
      <mat-label>Total Price (R):</mat-label>
      <input matInput readonly type="number" [value]="Total">
      </mat-form-field>
    </div>
  </div>
  <div class="modal-footer" mat-dialog-actions>
    <button type="button" class="btn btn-outline-secondary"mat-dialog-close>
      Close
    </button>
    <button (click)="ConfirmOrder()" type="button" class="btn btn-outline-secondary">
      Confirm Order
    </button>
  </div> `,

})
export class ConfirmOrderDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmOrderDialog>, private api: ExperTexhService,
    private suppService: SupplierService, private router: Router, private snack: MatSnackBar,
    public service: StockService,
    @Inject(MAT_DIALOG_DATA) public data: SupplierOrderData) { }

  
    
    Supplier: string;
    Display: SupplierOrderData;
    LineItems: StockItemLines[]
    Total = 0;
  
  ngOnInit() {

    this.Display = new SupplierOrderData();
    this.LineItems = new Array()
    this.service.getStockList().subscribe((res: StockData[]) => {
     
      this.suppService.getSupplierList().subscribe((res: SupplierData[]) => {

        this.Display.Supplier = res.find(zz => zz.SupplierID == this.data.SupplierID).Name
      });

      console.log("Items: ", res)
      var newLine = new SupplierOrderData().StockItemLines
      this.data.StockItemLines.forEach( s=> 
        {
          var item = res.find(zz => zz.ItemID == <number>s.ItemID)
          let Item =
          {
            ItemID: item.ItemID,
            Items: item.Name,
            Price: item.Price,
            Quantity: s.Quantity 
          }

          if(item.Color != null)
          {
            Item.Items += " (" + item.Color + ")"
          }

          this.Total += Item.Price * Item.Quantity
          
          this.LineItems.push(Item)
        })

        this.Display.StockItemLines = this.LineItems;
        console.log("StockItems", this.Display)
    })

    

    
  }

  ConfirmOrder() 
  {
     this.suppService.CreateOrder(this.data, this.api.SessionID).subscribe(ref => {
      if (ref == "success") {
        this.snack.open("Order successfuly made", "OK", { duration: 3000 })
        this.router.navigateByUrl("placeorder")
      }
    });
  }
}