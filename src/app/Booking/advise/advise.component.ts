import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Inject } from '@angular/core';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { Schedules } from '../schedule/schedule.component';
import { Router } from '@angular/router';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { startOfMonth, startOfWeek, endOfWeek, format, getDate } from 'date-fns';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/API Services/for Booking/client';
import { CalendarDialog } from '../makebooking/makebooking.component';

export class CalData {
  EmployeeID: any;
  Employee: string;
  ServiceTypes: [{ TypeID: any }]
  DateID: any;
  Dates: Date;
  TimeID: any;
  StartTime: any;
  EndTime: any;
  StatusID: any;

  StartDateTime: any;
  EndDateTime: any;
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

@Component({
  selector: 'app-advise',
  templateUrl: './advise.component.html',
  styleUrls: ['./advise.component.css']
})
export class AdviseComponent implements OnInit {

  constructor(private service: ReportingService, private router: Router, private snack: MatSnackBar, private dialog: MatDialog,
    private api: ExperTexhService, private http: HttpClient, private fb: FormBuilder) { }

  EmployeeList: Employee[]
  Times: [];
  chosenDate: any;
  Booking: Schedules;
  EmpCalendar: Observable<CalendarEvent<CalData>[]>;
  showIcon = false;

  today = new Date();


  AdviseForm: FormGroup;

  ngOnInit(): void {
    if (this.api.RoleID == "2") 
    {
      this.chosenDate = localStorage.getItem("DateChosen")
      
      this.service.readEmployee(this.api.SessionID)
      .subscribe(res => {
        this.EmployeeList = res;
      }, error => {console.log("Error",error), this.snack.open("Something went wrong", "OK", {duration: 3000})});

      this.http.get<[]>(this.api.url + "Booking/getTimes")
        .subscribe(res => { this.Times = res }, error => {console.log("Error",error), this.snack.open("Something went wrong", "OK", {duration: 3000})});

      this.Booking = JSON.parse(localStorage.getItem("BookingDetails"))

      console.log(this.Booking)

      this.AdviseForm = this.fb.group({
        employeeid: ['', Validators.required],
        timesid: ['', Validators.required],
        datesid: ['', Validators.required]
      })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }
  }

  ViewSchedule()
  {
    
    if(this.showIcon == false)
    {
      alert("Select an Employee first");
      return;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '800px';
    dialogConfig.height = '500px'
    dialogConfig.data = this.EmpCalendar;

    this.dialog.open(CalendarDialog, dialogConfig)
  }

  

  get g()
  {
    return this.AdviseForm.controls;
  }
  AdviseBooking(form) {

    if(this.AdviseForm.invalid)
    {
      this.AdviseForm.markAllAsTouched();
      return;
    }

    const BookingData =
    {
      SessionID: this.api.SessionID,
      BookingID: this.Booking.BookingID,
      EmployeeID: form.value.employeeid,
      RequestedID: this.Booking.BookingRequest.RequestedID,
      Date: form.value.datesid,
      TimeID: form.value.timesid
    }

    this.api.AdviseBooking(BookingData).subscribe((res: any) => {
      if (res == "success") {
        this.snack.open("Booking advise successfully sent to client", "OK", {duration: 3000});
        this.router.navigateByUrl("/schedule");
      }
      else if(res.Error == "timeslot"){
        alert(res.Message)
        return;
      }
      else{
        console.log(res)
      }
    }, error => {console.log("Error",error), this.snack.open("Something went wrong", "OK", {duration: 3000})})

  }

  cancel() {
    localStorage.removeItem("DateChosen");
    localStorage.removeItem("BookingDetails");

    window.history.back();
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

  fetchEvents(EmployeeID:any) {
    this.showIcon = true;
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
              draggable: false
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



}
