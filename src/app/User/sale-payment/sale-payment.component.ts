import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { SaleService } from 'src/app/API Services/for Supplier/sale.service';
import { SaleData } from '../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PaymentType } from 'src/app/API Services/for User/process';
import { Observable } from 'rxjs';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sale-payment',
  templateUrl: './sale-payment.component.html',
  styleUrls: ['./sale-payment.component.css']
})
export class SalePaymentComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SaleData>;
  @ViewChild(MatStepper) steps: MatStepper;

  dataSource;
  SaleList: SaleData[];

  selectedSale: SaleData;

  PaymentType: Observable<PaymentType[]>;

  TypeControl = new FormControl('', Validators.required)
  AmountControl = new FormControl(null, Validators.required)
  Total = 0;
  Change = 0;
  notCash = true;

  PickSale = null;

  displayedColumns = ['saleid', 'client', 'saletype', 'items', 'date', 'select'];

  constructor(private api: ExperTexhService, private service: SaleService, private rservice: ReportingService,
    private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
    if (this.api.RoleID == "2") {
      this.selectedSale = JSON.parse(localStorage.getItem("PickSale"));

      this.dataSource = new MatTableDataSource(this.SaleList)
      this.service.getProdSaleList().subscribe(res => {
        this.SaleList = res;
        this.dataSource.data = this.SaleList;
      })
      this.PaymentType = this.rservice.getPaymentType();
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }


  calcChange(value: number) {
    this.Change = value - this.Total;
  }

  checkCash(id) {

    if (id == 2) {
      this.notCash = false;
    }
    else {
      this.notCash = true
    }
  }

  CalcTotal(Sale: SaleData, stepper: MatStepper) {
    Sale.Products.forEach(s => {
      this.Total += (s.Price * s.Quantity);
    })

    stepper.next();
  }

  onSubmit() {

    if (this.TypeControl.invalid) {
      alert("fill in all required forms")
      this.TypeControl.markAllAsTouched();
      return;

    }

    let payDetails = null;

    if (this.notCash == true) {
      payDetails =
      {
        SaleID: this.selectedSale.SaleID,
        PaymentTypeID: this.TypeControl.value,
        Price: this.Total,
        SessionID: this.api.SessionID
      }
    }
    else if (this.notCash == false) {
      if (this.AmountControl.invalid) {
        this.AmountControl.markAsTouched();
        return;
      }

      if (this.Change < 0) {
        alert("Full payment amount is required")
        return;
      }

      payDetails =
      {
        SaleID: this.selectedSale.SaleID,
        PaymentTypeID: this.TypeControl.value,
        Price: this.AmountControl.value,
        SessionID: this.api.SessionID,
        Change: this.Change
      }

    }

    this.service.SalePayment(payDetails).subscribe((res: any) => 
    {
      if (res == "success") {
        this.snack.open("Sale successfully paid", "OK", { duration: 3000 })
        this.router.navigate(["payment"])
      }
      else if (res.Error == "session") {
        alert("res.Message")
      }
      else {
        alert("Session is no longer valid. User needs to login")
        //this.router.navigate(["login"],{queryParams:{'redirectURL':this.state.url}})
      }
    });

  }

  reset(stepper: MatStepper) {
    this.AmountControl.reset();
    this.TypeControl.reset();
    this.Change = 0;
    this.notCash = true;
    this.selectedSale = null;
    stepper.reset();
    //window.history.back();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  SelectedSale(Sale: SaleData, stepper: MatStepper) {
    this.selectedSale = Sale;
    stepper.selected.completed = true;
    stepper.selected.editable = false;
    stepper.next();
    //this.router.navigateByUrl("/confirm")
  }

  cancel(stepper: MatStepper) {
    this.selectedSale = null;
    stepper.reset();
  }

  myFunction(event: any) {
    //declare variables

    var input, filter, table, tr, td, r, txtValue, th;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    th = table.getElementsByTagName('th');

    //loop through all table rows and hide those who dont match search query
    for (r = 1; r < tr.length; r++) {
      tr[r].style.display = 'none';

      for (var k = 0; k < tr.length; k++) {
        td = tr[r].getElementsByTagName('td')[k];

        if (td) {
          txtValue = td.textContent || td.innerText;
          if (
            txtValue.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) >
            -1
          ) {
            tr[r].style.display = '';
            break;
          }
        }
      }
    }
  }

}
