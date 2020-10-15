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
import { Router } from '@angular/router';
import { Client } from 'src/app/API Services/for Booking/client';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {
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
    public service: ReportingService,
    private router: Router
  ) { }
  List: Observable<Client[]>;

  ngOnInit(): void {
    this.loadList();
    this.resetForm();
  }

  loadList() {
    this.List = this.service.readClient();
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
  
  //populating the diting stuff
  fillUP(formData: Process)
  {
    this.service.formData = formData;
    this.router.navigateByUrl("/confirm")
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

  UpdateClient(form: NgForm){
    this.service.updateClient(form.value).subscribe(ref =>{this.loadList()});
  }

  DeleteClient(ClientID){
    this.service.deleteClient(ClientID, this.api.SessionID).subscribe(ref => {this.loadList()});
  }
}
