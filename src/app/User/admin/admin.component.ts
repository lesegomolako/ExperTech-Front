import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';

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
    public dialog: MatDialog, 
    public service: ReportingService) { }

  List: Observable<Process[]>;

  ngOnInit(): void {
    this.loadList();
    this.resetForm();
  }
  loadList() {
    this.List = this.service.readAdmin();
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
    for (r = 0; r < tr.length; r++) {
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

  UpdateAdmin(form: NgForm){
    this.service.updateAdmin(form.value).subscribe(ref =>{this.loadList()});
  }

  DeleteAdmin(form: Process){
    this.service.deleteAdmin(form).subscribe(ref => {this.loadList()});
  }
}
    
