import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import { Process } from '../../API Services/for User/process';
import { Router } from '@angular/router';
import { Admin } from 'src/app/API Services/for Booking/client';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CbookingDialog } from 'src/app/Staff/get-bookings/get-bookings.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
  constructor(
    public dialog: MatDialog, private api: ExperTexhService,
    public service: ReportingService, public snack: MatSnackBar,
    private router: Router) { }

  List: Observable<Admin[]>;
  isOwner = false;
  AdminID;

  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.loadList();
      this.resetForm();
      this.api.getProfile().subscribe((res: any) => { this.isOwner = res.Admins[0]?.Owner; this.AdminID = res.Admins[0]?.AdminID })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }

  }

  loadList() {
    this.List = this.service.readAdmin(this.api.SessionID);
  }

  registerAdmin() {

    this.router.navigateByUrl("/adminregister")
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;
  previousForm() {
    window.history.back();
  }
  matcher = new ErrorStateMatcher();

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  MakeOwner(AdminID)
  {
    this.service.MakeOwner(AdminID, this.api.SessionID).subscribe(
      res => {
        if(res == "success")
        {
          this.snack.open("Owner privileges assigned", "OK", {duration: 3000})
          window.location.reload();
        }
        else
        {
          this.snack.open("Something went wrong, please try again", "OK", {duration: 3000})
          console.log(res)
        }
      }, error => { console.log(error), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
  }

  RevokeOwner(AdminID)
  {
    this.service.RevokeOwner(AdminID, this.api.SessionID).subscribe(
      res => {
        if(res == "success")
        {
          this.snack.open("Owner privileges revoked", "OK", {duration: 3000})
          window.location.reload();
        }
        else
        {
          this.snack.open("Something went wrong, please try again", "OK", {duration: 3000})
          console.log(res)
        }
      }, error => { console.log(error), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
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
  resetForm(form?: NgForm) {
    if (form != null) form.reset();

    this.service.formData = {
      AdminID: null,
      Name: null,
      Surname: null,
      ContactNo: null,
      Email: null,
      EmployeeID: null,
      UserID: null,
      ClientID: null,
      Username: null,
      Password: null,
      Times: {
        StartTime: null,
        EndTime: null,
      },
      Dates: {
        StartDate: null,
        EndDate: null,
      },
      Reminder: null,
      Quantity: null,
      Payment: null,
      Description: null,
      PackageID: null,
      ServiceID: null,
      Type: null,
      StatusID: null,
      TypeID: null,
      SessionID: null,
      InfoID: null,
      Address: null,

    };
  }

  UpdateAdmin(form: NgForm) {
    this.service.updateAdmin(form.value).subscribe(ref => { this.loadList() });
  }

  DeleteAdmin(AdminID) {

    if (confirm("Are you sure you want to delete this admin?")) {
      if (this.isOwner == true) {
        this.service.deleteAdmin(AdminID, this.api.SessionID)
          .subscribe((ref: any) => {
            if (ref == "success") {
              this.snack.open("Admin successfully deleted", "OK", { duration: 3000 })
              this.loadList();
            }
            else if (ref.Error == "session") {
              alert(ref.Message);
            }
            else {
              console.log(ref)
            }
          }, error => { console.log(error), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
      }
      else {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = '400px';
        dialogConfig.height = '300px';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;


        const dialogRef = this.dialog.open(CbookingDialog, dialogConfig);

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res == true) 
          {
            this.service.deleteAdmin(AdminID, this.api.SessionID, res.OwnerID)
            .subscribe((ref: any) => {
              if (ref == "success") {
                this.snack.open("Admin successfully deleted", "OK", { duration: 3000 })
                this.loadList();
              }
              else if (ref.Error == "session") {
                alert(ref.Message);
              }
              else {
                console.log(ref)
              }
            }, error => { console.log(error), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
          }
        })
      }
    }
  }
}