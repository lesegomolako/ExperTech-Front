import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process, Package, PaymentType} from '../../API Services/for User/process';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { PackageData } from 'src/app/API Services/for Service/services';
import { Client } from 'src/app/API Services/for Booking/client';
import { MatStepper } from '@angular/material/stepper';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';




@Component({
  selector: 'app-spackage',
  templateUrl: './spackage.component.html',
  styleUrls: ['./spackage.component.sass']
})
export class SpackageComponent implements OnInit {
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
    public service: ReportingService,
    private fb: FormBuilder,
    private router: Router,
    private api: ServicesService,
    private clientService: ExperTexhService,
  ) { }

  PackageList: Observable<PackageData[]>;
  ClientList: Observable<Client[]>;

  SelectedPackage: PackageData;
  SelectedClient: Client;

  PaymentType: Observable<PaymentType[]>;

  TypeControl: FormControl;

  SelectPackage(Package: PackageData,  stepper: MatStepper)
  {

    this.SelectedPackage = Package;
    stepper.selected.completed = true;
    stepper.selected.editable = false;
    stepper.next();

    //this.router.navigateByUrl("/confirm")
  }

  SelectClient(Client: Client,  stepper: MatStepper)
  {
    this.SelectedClient = Client;
    stepper.selected.completed = true;
    stepper.selected.editable = false;
    stepper.next();
    //this.router.navigateByUrl("/confirm")
  }

  ngOnInit(): void {

    if(this.clientService.RoleID == "2")
    {
      this.TypeControl = this.fb.control('', Validators.required)
      this.loadList();
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  Activate()
  {
    if(this.TypeControl.invalid)
    {
      alert("Select Payment Type");
      return;
    }

    const ActivatePackage = 
    { 
      PaymentTypeID: this.TypeControl.value,
      Payment: this.SelectedPackage.Price,
      ClientID: this.SelectedClient.ClientID,
      ClientPackages:
      [
        {
          PackageID: this.SelectedPackage.PackageID,
          Duration: this.SelectedPackage.Duration
        }
      ]

    }

    this.service.activateSerPackage(ActivatePackage, this.clientService.SessionID).subscribe((res:any) =>
      {
        if(res == "success")
        {

        }
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

  hide = true;

  reset(stepper: MatStepper) {
    this.SelectedClient = null;
    this.SelectedPackage = null;
    stepper.reset();
    //window.history.back();
  }
  
  matcher = new ErrorStateMatcher();
  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  loadList()
  {
    this.PackageList = this.api.getServicePackages();
    this.ClientList = this.service.readClient();
    this.PaymentType = this.service.getPaymentType();
  }

  //local storage for the service package packageID
  getID(PackageID: any){
    localStorage.setItem("PackageID", PackageID)
    this.router.navigateByUrl("/client")
  }
}
