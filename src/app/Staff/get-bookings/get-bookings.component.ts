import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ReportingService } from '../../API Services/for User/reporting.service';
import { state } from '@angular/animations';
import { MatStepper } from '@angular/material/stepper';
import { PaymentType } from 'src/app/API Services/for User/process';
import { Observable } from 'rxjs';
import { PackageData } from 'src/app/API Services/for Service/services';
import { map } from 'rxjs/operators';
import { User } from 'src/app/API Services/for Booking/client';
import { MatSnackBar } from '@angular/material/snack-bar';

export class BookingData {
  BookingID: any;
  ClientID: any;
  Client: string;
  Status: string;
  DateTime: any;
  Service: string;
  Price: any;
  ServiceID: any;
  HasPackage: boolean;
  OverDue: boolean;
  PackageDetails?:
    {
      PackageID: any;
      SaleID: any;
      Name: string;
    }

}

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent implements OnInit {

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<BookingData>;


  TypeControl = new FormControl('', Validators.required)
  RadioControl = new FormControl('1')
  PaymentType: Observable<PaymentType[]>;
  foundPackage = false;
  ServicePackage: PackageData;

  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['BookingID', 'Client', 'Service', 'Status', 'Price', 'Date'];

  searchKey: string;


  constructor(public api: ExperTexhService, public service: ReportingService, private snack: MatSnackBar,
    public dialog: MatDialog, private http: HttpClient, private router: Router) { }

  BookingsList: BookingData[];

  SelectedBooking: BookingData;
  state: RouterStateSnapshot;
  dataSource;
  isOwner = false;





  enable(g) {

    if (g == "1") {
      this.TypeControl.enable()
    }
    else if (g == "2") {
      this.TypeControl.reset();
      this.TypeControl.disable();
    }
  }



  ngOnInit() {

    if (this.api.RoleID == "2") {
      //this.dataSource = new MatTableDataSource()
      this.api.getProfile().subscribe((res: User) => { this.isOwner = res.Admins[0].Owner })

      this.loadlist();


      this.PaymentType = this.service.getPaymentType();
    }
    else {
      this.router.navigate(["403Forbidden"])
    }


  }

  loadlist() {
    var today = new Date();
    this.http.get<BookingData[]>(this.api.url + "Admin/GetBookings").subscribe((res: BookingData[]) => {
      this.BookingsList = res.filter(zz => new Date(zz.DateTime) < today)
        .sort((a, b) => 0 - (a['DateTime'] > b['DateTime'] ? 1 : -1))
    });
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

  reset(stepper: MatStepper) {
    this.SelectedBooking = null;
    stepper.reset();
    //window.history.back();
  }

  payDetails;
  onSubmit() {

    if (this.TypeControl.invalid) {
      this.TypeControl.markAsTouched();
      return;
    }


    if (this.RadioControl.value == "1") {
      this.payDetails =
      {
        BookingID: this.SelectedBooking.BookingID,
        PaymentTypeID: this.TypeControl.value,
        Price: this.SelectedBooking.Price,
        SessionID: this.api.SessionID,

      }
    }
    else if (this.RadioControl.value == "2") {
      this.payDetails =
      {
        BookingID: this.SelectedBooking.BookingID,
        Price: this.SelectedBooking.Price,
        SessionID: this.api.SessionID,
        SaleID: this.SelectedBooking.PackageDetails.SaleID,
        PackageID: this.SelectedBooking.PackageDetails.PackageID
      }
    }

    console.log(this.payDetails);


    this.service.bookingPayment(this.payDetails).subscribe((res: any) => {
      if (res == "success") {
        this.snack.open("Booking successfully paid", "OK", { duration: 2000 })
        this.router.navigate(["payment"])
      }
      else if (res.Error == "session") {
        alert("res.Message")
      }
      else {
        console.log(res), this.snack.open("something went wrong", "OK", { duration: 2000, })
      }
    }, error => { console.log(error), this.snack.open("something went wrong", "OK", { duration: 2000 }) }
    );
  }

  SelectBooking(Booking: BookingData, stepper: MatStepper) {
    this.SelectedBooking = Booking;
    stepper.selected.completed = true;
    stepper.selected.editable = false;
    stepper.next();
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  NoShow(form: BookingData) {

    if (this.isOwner) {
      this.service.NoShow(form.BookingID, this.api.SessionID).subscribe((res: any) => {
        if (res == "success") {
          alert("Booking status successfully changed")
          this.loadlist();
        }
        else if (res.Error == "session") {
          alert(res.Message)
        }
        else {
          console.log(res)
        }
      })
    }
    else {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.width = '400px';
      dialogConfig.height = '300px';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      

      const dialogRef = this.dialog.open(CbookingDialog, dialogConfig);

      dialogRef.afterClosed().subscribe((res: any) => {
        if (res == true) {
          this.service.NoShow(form.BookingID, this.api.SessionID).subscribe((res: any) => {
            if (res == "success") {
              alert("Booking status successfully changed")
              this.loadlist();
            }
            else if (res.Error == "session") {
              alert(res.Message)
            }
            else {
              console.log(res)
            }
          })
          this.loadlist()
        }
      });
    }

  }


}




@Component({
  selector: 'app-cbooking',
  templateUrl: './cbooking.component.html'
  // styleUrls: ['./cbooking.component.sass']
})
export class CbookingDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CbookingDialog>,
    private router: Router,  private snack: MatSnackBar,
    public service: ReportingService,
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ExperTexhService
  ) { }

  List: any;
  authorizeForm: FormGroup;
  submitted = false;
  bookingObject: BookingData;
  type: any;
  state: RouterStateSnapshot;

  Invalid = false;

  ngOnInit() {
    this.authorizeForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.List = this.service.getPaymentType();
    //this.bookingObject = this.data;
  }

  get f() {
    return this.authorizeForm.controls;
  }



  onSubmit(form) 
  {

    this.Invalid = false;
    if (this.authorizeForm.invalid) {
      this.authorizeForm.markAllAsTouched();
      return;
    }

    this.service.Authorize(form.value, this.api.SessionID).subscribe((res: any) => {
      if (res == "success") 
      {
        this.snack.open("Authorization granted", "OK", {duration: 3000})
        this.dialogRef.close(true);
      }
      else if (res == "denied") {
        this.Invalid = true;
      }
      else if (res.Error == "session") {
        alert("Session is no longer valid. User needs to login")
        this.router.navigate(["login"], { queryParams: { 'redirectURL': this.state.url } })
      }
    }
    );
  }



}






