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
import { MatSnackBar } from '@angular/material/snack-bar';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';



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
    public dialog: MatDialog, private snack: MatSnackBar,
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

  TypeControl = new FormControl('', Validators.required) 
  AmountControl = new FormControl(null, Validators.required)
  Total = 0;
  Change = 0;
  notCash = true;

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

  calcChange(value: number)
  {
    this.Change = value - this.SelectedPackage.Price;
  }

  checkCash(id)
  {
   
    if(id==2)
    {
      this.notCash = false;
    }
    else
    {
      this.notCash = true
    }
  }

  Activate(stepper:MatStepper)
  {
    if(this.TypeControl.invalid)
    {
      alert("Select Payment Type");
      return;
    }

    let ActivatePackage = null;
    if(this.notCash == true)
    {
      ActivatePackage = 
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
    }
    else if(this.notCash == false)
    {
      if(this.AmountControl.invalid)
      {
        this.AmountControl.markAsTouched();
        return;
      }

      if(this.Change<0)
      {
        alert("Full payment amount is required")
        return;
      }

      ActivatePackage = 
      { 
        PaymentTypeID: this.TypeControl.value,
        Payment: this.AmountControl.value,
        ClientID: this.SelectedClient.ClientID,
        ClientPackages:
        [
          {
            PackageID: this.SelectedPackage.PackageID,
            Duration: this.SelectedPackage.Duration
          }
        ],
        Change: this.Change
      }   
    }

      this.service.activateSerPackage(ActivatePackage, this.clientService.SessionID).subscribe((res:any) =>
        {
          if(res == "success")
          {
            this.snack.open("Service Package successfully activated", "OK", {duration: 2000})
            this.router.navigate(["employeehome"])
          }
          else if(res == "duplicate")
          {
            alert("Client already has an active service package for the selected package")
            stepper.reset();
          }
          else
          {
            console.log(res)
          }
        }, error => {console.log("Error",error), this.snack.open("Something went wrong", "OK", {duration: 2000})});
    
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
    this.AmountControl.reset();
    this.TypeControl.reset();
    this.Change = 0;
    this.notCash = true;
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
