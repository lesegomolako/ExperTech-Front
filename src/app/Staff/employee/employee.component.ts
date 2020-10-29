import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import { Process } from '../../API Services/for User/process';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CbookingDialog } from '../get-bookings/get-bookings.component';
import { Employee } from 'src/app/API Services/for Booking/client';
import { LoadingDialog } from 'src/app/app.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass'],
})
export class EmployeeComponent implements OnInit {
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
    public dialog: MatDialog, private snack: MatSnackBar,
    public service: ReportingService,
    private router: Router,
    private api: ExperTexhService
  ) { }
  List: Observable<Employee[]>;

  isOwner = false;

  ngOnInit(): void {
    if (this.api.RoleID == "2") {
      this.loadList();
      this.resetForm();
      this.api.getProfile().subscribe((res: any) => { this.isOwner = res.Admins[0].Owner })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  loadList() {
    this.List = this.service.readEmployee(this.api.SessionID);
  }

  registerEmp() {
    this.router.navigateByUrl("/employeeregister")
  }

  //populating the diting stuff
  fillUP(formData: Process) {
    this.service.formData = formData;
    //this.router.navigateByUrl("/confirm")
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
  UpdateEmployee(form: NgForm) {
    this.service.updateEmployee(form.value).subscribe((ref) => {
      this.loadList();
    });
  }

  DeleteEmployee(EmployeeID) {


    if (confirm("Are you sure you want to delete this Employee?")) {
      if (this.isOwner == true) {
        const dialogRef = this.dialog.open(LoadingDialog, { disableClose: true })
        this.service.deleteEmployee(EmployeeID, this.api.SessionID, false)
          .subscribe((ref: any) => {
            if (ref == "success") {
              this.snack.open("Employee successfully deleted", "OK", { duration: 3000 })
              dialogRef.close();
              this.loadList();
            }
            else if (ref.Error == "session") {
              dialogRef.close();
              alert(ref.Message);
            }
            else if (ref.Error == "dependencies") {
              if (confirm(ref.Message)) {
                this.service.deleteEmployee(EmployeeID, this.api.SessionID, true)
                  .subscribe((ref: any) => {
                    if (ref == "success") {
                      this.snack.open("Employee successfully deleted", "OK", { duration: 3000 })
                      dialogRef.close();
                      this.loadList();
                    }
                    else if (ref.Error == "session") {
                      dialogRef.close();
                      alert(ref.Message);
                    }
                    else {
                      dialogRef.close();
                      console.log(ref)
                    }
                  })
              }
            }
            else {
              console.log(ref)
              dialogRef.close();
              this.snack.open("Something went wrong. Please try again later", "OK", { duration: 3000 })
            }
          }, error => { console.log(error),dialogRef.close(), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
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
            const dialogRef = this.dialog.open(LoadingDialog, { disableClose: true })
            this.service.deleteEmployee(EmployeeID, this.api.SessionID, false)
              .subscribe((ref: any) => {
                if (ref == "success") {
                  this.snack.open("Employee successfully deleted", "OK", { duration: 3000 })
                  dialogRef.close();
                  this.loadList();
                }
                else if (ref.Error == "session") {
                  dialogRef.close();
                  alert(ref.Message);
                }
                else if (ref.Error == "dependencies") {
                  if (confirm(ref.Message)) {
                    this.service.deleteEmployee(EmployeeID, this.api.SessionID, true)
                      .subscribe((ref: any) => {
                        if (ref == "success") {
                          this.snack.open("Employee successfully deleted", "OK", { duration: 3000 })
                          dialogRef.close();
                          this.loadList();
                        }
                        else if (ref.Error == "session") {
                          dialogRef.close();
                          alert(ref.Message);
                        }
                        else {
                          dialogRef.close();
                          console.log(ref)
                        }
                      })
                  }
                }
                else {
                  dialogRef.close();
                  console.log(ref)
                  this.snack.open("Something went wrong. Please try again later", "OK", { duration: 3000 })
                }
              }, error => { console.log(error),dialogRef.close(), this.snack.open("Something went wrong", "OK", { duration: 3000 }) });
          }
        })
      }
    }
  }
}
