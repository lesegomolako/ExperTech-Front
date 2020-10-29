import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { StockData, WriteOffData } from '../../../API Services/for Supplier/sales';
import { NgForm, Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { User } from 'src/app/API Services/for Booking/client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CbookingDialog } from 'src/app/Staff/get-bookings/get-bookings.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-writeoff',
  templateUrl: './writeoff.component.html',
  styleUrls: ['./writeoff.component.css']
})
export class WriteoffComponent implements OnInit {
  constructor(
    public service: StockService,
    private formBuilder: FormBuilder,
    private writeService: StockService,
    private http: HttpClient, private snack: MatSnackBar,
    private route: Router, private dialog: MatDialog,
    private api: ExperTexhService) { }


  StockList: StockData[];
  writeOffForm: FormGroup;
  Write: WriteOffData;

  WriteList: Observable<WriteOffData[]>;
  Quantity = 0;

  countQuantity(value) {
    this.Quantity = value
  }


  isOwner = false;

  ngOnInit(): void {

    if (this.api.RoleID == "2") {

      this.api.getProfile().subscribe((res: User) => {
        this.isOwner = res.Admins[0].Owner;

        if (this.isOwner == false) {
          this.Authorized()
        }
      })



      this.service.getStockList().subscribe(res => {
        this.StockList = res;

      })

      this.writeOffForm = this.formBuilder.group({
        description: ['', Validators.required],
        writeofflines: this.formBuilder.array(
          [
            this.AddStockItems()
          ]
        )
      })
    }
    else {
      this.route.navigate(["403Forbidden"])
    }
  }

  OwnerID;
  Authorized() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = '300px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(CbookingDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.Status == true) {
        this.OwnerID = res.OwnerID;
      }
      else {
        this.snack.open("User is not authorized to continue", "OK", { duration: 3000 })
        this.route.navigate(["stock"])
      }
    })
  }

  AddForm() {
    (<FormArray>this.writeOffForm.get('writeofflines')).push(this.AddStockItems());
  }
  DeleteForm(ItemID: any): void {
    (<FormArray>this.writeOffForm.get('writeofflines')).removeAt(ItemID);
  }

  AddStockItems(): FormGroup {
    return this.formBuilder.group({
      quantity: ['', Validators.required],
      itemid: ['', Validators.required],
      reason: ['', Validators.required]
    })
  }

  AddWriteOff() {
    if (this.writeOffForm.invalid) {
      alert("form is invalid")
      return;
    }

    this.mapValues();

    if (this.isOwner == true) {
      this.writeService.CreateWrite(this.Write, this.api.SessionID).subscribe(ref => {
        if (ref == "success") {
          alert("Successfully saved")
          this.route.navigateByUrl("writeoff")
        }
      });
    }
    else
    {
      this.writeService.CreateWrite(this.Write, this.api.SessionID, this.OwnerID).subscribe(ref => {
        if (ref == "success") {
          alert("Successfully saved")
          this.route.navigateByUrl("writeoff")
        }
      });
    }

  }

  mapValues() {
    this.Write = this.writeOffForm.value;
    // this.Write.AdminID = 1;
  }

  setValidator(j, x: StockData)
  {
    var group = (<FormArray>this.writeOffForm.get('writeofflines')).at(j) as FormGroup
    var max = x.QuantityInStock;

    group.controls["quantity"].setValidators(Validators.max(max))
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


}
