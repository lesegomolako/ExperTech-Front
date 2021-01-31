import { Component, Inject, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__, NgModule, PipeTransform } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client, Schedule, Booking, EmployeeSchedule, empSchedge } from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';
import { ServiceData, ServiceTypeData } from 'src/app/API Services/for Service/services';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { CalData } from '../advise/advise.component';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { OptionsFilterPipe } from 'src/app/API Services/for Booking/Pipes/options-filter.pipe';



export class EmployeeInfo {
  EmployeeID: any;
  Name: string;
  TypeID: any;

  EmployeeServiceTypes:
    [
      {
        EmployeeID: any;
        DateID: any;
        TimeID: any;
      }
    ]

  EmployeeSchedules:
    [
      {
        EmployeeID: any;
        TypeID: any;
      }
    ]

}

@Component({
  selector: 'app-makebooking',
  templateUrl: './makebooking.component.html',
  styleUrls: ['./makebooking.component.css'],
  providers: [DatePipe, OptionsFilterPipe]
})
export class MakebookingComponent implements OnInit {
  BookingForm: FormGroup;
  step = 0;
  submitted = false;
  title = 'Edit';
  user: any;
  id: number;

  client: Client;
  name: string;
  dataSaved = false;
  customerForm: any;
  massage = null;

  TypesID: number;
  ServicesID: number;

  imageURL = null;

  checkOptions()
  {
    var list = this.optPipe.transform(this.ServiceOptions, this.ServicesID);
    var count = list.length
    if(count == 0)
    {
      this.BookingForm.get("OptionControl").clearValidators();
      this.BookingForm.get("OptionControl").updateValueAndValidity();
      console.log("clear validator")
    }
    else
    {
      console.log("set validator")
      this.BookingForm.get("OptionControl").setValidators(Validators.required);
      this.BookingForm.get("OptionControl").updateValueAndValidity();
    }
  }

  clear() {
    this.BookingForm.patchValue(
      {
        clientid: "",
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
      }
    )
  }

  



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  public MakeFormGroup: FormGroup;
  constructor(public dialog: MatDialog, private http: HttpClient, private api: ExperTexhService, private fb: FormBuilder,
    private snack: MatSnackBar, private datepipe: DatePipe,
    private router: Router,private optPipe:OptionsFilterPipe, private route: ActivatedRoute, private service: ServicesService) { }

  Employee = [];
  Service: ServiceData[];
  ServiceType: ServiceTypeData[];
  ServicePhotos = [];
  ServiceOptions = [];
  Schedge: Observable<Schedule[]>;
  Times = [];

  Schedule: EmployeeSchedule[];

  today = new Date();
  toDate = this.datepipe.transform(this.today, 'dd/MM/yy');
  toTime = this.datepipe.transform(this.today, 'HH:mm')
  selectedDate;

  servControl = true;
  optControl = true;
  TimeDateControl = true;

  // BookingData: Booking;


  EnableForm(Type: ServiceTypeData) {
    this.BookingForm.get("ServiceControl").enable();
    this.BookingForm.get("employeeControl").enable();
    this.TypesID = Type.TypeID;
    //this.ServicesID = this.BookingForm.value.ServiceControl
  }

  EnableOptForm(Service: ServiceData) {
    this.imageURL = Service.Image;
    this.ServicesID = Service.ServiceID;
    this.BookingForm.get("OptionControl").enable();
    //this.ServicesID = this.BookingForm.value.ServiceControl

  }

  EmpCalendar: Observable<CalendarEvent<CalData>[]>;
  EnableDateForm(EmployeeID) {
    this.BookingForm.get("DateControl").enable();

    const params = new HttpParams()
      .set(
        'SessionID', this.api.SessionID);

    this.EmpCalendar = this.http
      .get('https://localhost:44380/api/Employees/DisplayEmployeeSchedules', { params })
      .pipe(
        map((res: CalData[]) => { console.log(res)
          return res.filter(s => s.EmployeeID == EmployeeID).map((Avail: CalData) => {
            if (Avail.StatusID == 1) {
              return {
                title: Avail.StartTime + "-" + Avail.EndTime,
                start: new Date(
                  Avail.StartDateTime
                ),
                end: new Date(
                  Avail.EndDateTime
                ),
                color: colors.green,
                allDay: false,
                draggable: false,
                meta: Avail
              }
            }
            else if (Avail.StatusID == 2) {
              return {
                title: Avail.StartTime + "-" + Avail.EndTime,
                start: new Date(
                  Avail.StartDateTime
                ),
                end: new Date(
                  Avail.EndDateTime
                ),
                color: colors.yellow,
                allDay: false,
                draggable: false,
                meta: Avail
              }
            }
            else {
              return {
                title: Avail.StartTime + "-" + Avail.EndTime,
                start: new Date(
                  Avail.StartDateTime
                ),
                end: new Date(
                  Avail.EndDateTime
                ),
                color: colors.red,
                allDay: false,
                draggable: false,
                meta: Avail
              }
            }
          })
        }, error => console.log("Error",error))
      );

  }



  EnableTimeForm(event) {
    var selectedDate: Date = event;

    this.selectedDate = this.datepipe.transform(selectedDate, 'dd/MM/yy');
    this.BookingForm.get("TimeControl").enable();
  }



  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  ngOnInit(): void {
    if (this.api.RoleID == "2") {
      this.BookingForm = this.fb.group({
        ServiceControl: new FormControl({ value: '', disabled: true }, Validators.required),
        DateControl: new FormControl({ value: '', disabled: true }, Validators.required),
        TimeControl: new FormControl({ value: '', disabled: true }, Validators.required),
        OptionControl: new FormControl({ value: '', disabled: true }),
        employeeControl: new FormControl({ value: '', disabled: true }, Validators.required),
        NotesControl: new FormControl(''),
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        contact: ['', Validators.required],
        email: ['', Validators.required],
        clientid: ''
      })

      this.LoadList();
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  openAddDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddClientDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((res: any) => {
      this.BookingForm.patchValue(
        {
          clientid: res.ClientID,
          firstName: res.Name,
          lastName: res.Surname,
          contact: res.ContactNo,
          email: res.Email,
        }
      )
    });
  }

  openSearchDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '700px';
    dialogConfig.height = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SearchClientDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((res: any) => {
      this.BookingForm.patchValue(
        {
          clientid: res.ClientID,
          firstName: res.Name,
          lastName: res.Surname,
          contact: res.ContactNo,
          email: res.Email,
        }
      )
    });
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  // convenience getter for easy access to form fields
  get f() { return this.BookingForm.controls; }


  onSubmit(form) {
    this.BookingForm = form;

    this.submitted = true;

    // stop here if form is invalid
    if (this.BookingForm.invalid) {
      this.BookingForm.markAllAsTouched();
      return;
    }


    const BookingData =
    {
      ServiceID: this.BookingForm.value.ServiceControl,
      OptionID: this.BookingForm.value.OptionControl,
      Notes: this.BookingForm.value.NotesControl,
      StartDate: this.BookingForm.value.DateControl,
      TimeID: this.BookingForm.value.TimeControl,
      ClientID: this.BookingForm.value.clientid,
      EmployeeID: this.BookingForm.value.employeeControl,
      SessionID: this.api.SessionID
    }

    this.api.Makebooking(BookingData)
      .subscribe((res: any) => {
        if (res == "success") {
          this.snack.open("Booking successfully made", "OK", { duration: 3000 })
          this.router.navigate(["schedule"])

        }
        else if (res == "!available") {
          alert("The selected booking timeslot is not available. Please select another timeslot.")
          return;
        }
        else if (res.Error == "invalid") {
          alert("Booking details are invalid. Please resubmit the correct details")
          console.log(res)
        }
        else if (res.Error == "client") {
          alert("The selected Client details are invalid. Please resubmit the correct details")
          console.log(res)
        }
      }, error => { this.snack.open("Something went wrong. Please try again later", "OK", { duration: 3000 }) })


  }

  public checkError = (controlName: string, errorName: string) => {
    return this.MakeFormGroup.controls[controlName].hasError(errorName);
  }
  onReset() {
    this.submitted = false;
    this.BookingForm.reset();
  }

  ViewSchedule(EmployeeSchedule)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '800px';
    dialogConfig.height = '500px'
    dialogConfig.data = this.EmpCalendar;

    const dialogRef = this.dialog.open(CalendarDialog, dialogConfig)

    dialogRef.afterClosed().subscribe((res:any) => 
    {
      this.selectedDate = res.Dates;
      this.BookingForm.get("TimeControl").enable();
      this.BookingForm.get("DateControl").enable();
      this.BookingForm.patchValue({
        DateControl: res.Dates,
        TimeControl: <string>res.TimeID
      })
    })
  }


  LoadList() {
    const params = new HttpParams().set("SessionID", this.api.SessionID)

    this.http.get<EmployeeSchedule[]>(this.api.url + "Bookings/getEmployeeSchedule", { params })
      .subscribe((res: any) => {
        if (res.Error == "session") {
          alert(res.Message)
        }

        this.Schedule = res
        console.log(res)
      }
        , error => { console.log(error), this.snack.open("Something went wrong. Try again later", "OK", { duration: 3000 }) })


    this.service.getServices()
      .subscribe(res => { this.Service = res; })

    this.http.get<[]>(this.api.url + "Services/GetServiceOption")
      .subscribe(res => { this.ServiceOptions = res })

    this.service.getServiceTypes()
      .subscribe(res => { this.ServiceType = res })

    this.http.get<[]>(this.api.url + "Booking/getTimes")
      .subscribe(res => { this.Times = res })

  }

  list() {
    this.router.navigate(['Home']);
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
  }

  ViewImage() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = <HTMLImageElement>document.getElementById("img01");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = this.imageURL;
    captionText.innerHTML = "Service Photo"


  }

}

@Component({
  selector: "add-client",
  templateUrl: './client.html'
})
export class AddClientDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddClientDialog>, private api: ExperTexhService, private snack: MatSnackBar,
    private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ClientForm: FormGroup;

  ngOnInit() {
    if (this.api.RoleID == "2") {
      this.ClientForm = this.fb.group(
        {
          Name: ['', [Validators.required, Validators.maxLength(50)]],
          Surname: ['', [Validators.required, Validators.maxLength(100)]],
          ContactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          Email: ['', [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(50)]],
        })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  onSubmit(form): void {

    if (this.ClientForm.invalid) {
      alert("Enter all client details")
      this.ClientForm.markAllAsTouched();
      return;
    }

    const params = new HttpParams().set("SessionID", this.api.SessionID)
    this.http.post(this.api.url + "Clients/AddClient", form.value, { params }).subscribe((res: any) => {
      if (res.Message == "success") {
        this.snack.open("Client successfully added", "OK", { duration: 2000 })
        this.dialogRef.close(res.Client);
      }
      else if (res.Message == "duplicate") {
        if (confirm("Client details already exist. Would you select this client?")) {
          this.dialogRef.close(res.Client)
        }
      }
      else {
        alert(res.Message)
      }

    })

  }

  
}

@Component({
  selector: "search-client",
  templateUrl: './search.html'
})
export class SearchClientDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SearchClientDialog>, private api: ExperTexhService, private snack: MatSnackBar,
    private fb: FormBuilder, private http: HttpClient, private service: ReportingService) { }

  myControl = new FormControl();
  options: any[]
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.ClientList = this.service.readClient();

    this.http.get<[]>(this.api.url + 'Clients/getClient')
      .subscribe(res => { this.options = res; });


    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );


  }


  SelectClient(Client: Client) {
    this.snack.open("Client details selected", "OK", { duration: 3000 })
    this.dialogRef.close(Client);
  }

  ClientList: Observable<Client[]>;
  SelectedClient: Client;

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}



@Component({
  selector: "view-schedule", 
  templateUrl: './calendar.html',
  styleUrls: ['./makebooking.component.css']
})
export class CalendarDialog implements OnInit
{
  constructor( public dialogRef: MatDialogRef<CalendarDialog>, private api: ExperTexhService, private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Observable<CalendarEvent<CalData>[]>){}

  ngOnInit()
  {
    this.fetchEvents()
  }


  eventClicked(event: CalendarEvent<CalData>)
  {
    // console.log("Event:",event.meta)
    // return;
    if(event.meta?.StatusID != 1)
    {
      alert("The selected time is not available. Please select another time");
      return;
    }

    this.dialogRef.close(event.meta)
    //
  }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  events$: Observable<CalendarEvent<CalData>[]>;


  activeDayIsOpen: boolean = false;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }:
    {
      date: Date;
      events: CalendarEvent<CalData>[];
    }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  fetchEvents() {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];


    this.events$ = this.data;
  }

}


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#32CD32',
    secondary: '#FDF1BA',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
