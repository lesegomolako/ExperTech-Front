import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit, Inject} from '@angular/core';
import {startOfDay,endOfDay, subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import {Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {startOfMonth,startOfWeek,endOfWeek,format,getDate} from 'date-fns';
import { Observable } from 'rxjs';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class Schedules
{
  BookingID: any;
  BookingStatusID: any;
  BookingStatus: string;
  Client: string;
  BookingRequest: 
    {
      RequestedID: any
      Dates: string;
      Time: string;
      DateTime:string;
    }
  ;
  BookingLines:
  [
    {
      Service: string;
      Option: string;
    }
  ];
  BookingSchedule:
  [
    {
      Employee: string;
      Dates: Date;
      StartTime: any;
      EndTime: any;
      Status: string;
      DateTime:any
    }
  ]
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
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

 
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  events$: Observable<CalendarEvent<Schedules>[]>;
  

  events:CalendarEvent<{ Schedge: Schedules }>[];

  activeDayIsOpen: boolean = false;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

 

  refresh: Subject<any> = new Subject();

 

  constructor(public dialog: MatDialog, private api: ExperTexhService,
    private router: Router,
    private http: HttpClient) {}  

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
      this.fetchEvents();
    }
    else if(this.api.RoleID == "3")
    {
      this.fetchEmpEvents();
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
    
  }

  fetchEmpEvents()
  {
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
    
    const params = new HttpParams()
    .set(
      'SessionID', this.api.SessionID)

    this.events$ = this.http
      .get('https://localhost:44380/api/Employees/RetrieveEmployeeBooking', {params})
      .pipe(
        map(( res :  Schedules[] ) => {
          return res.map((Schedules: Schedules) => {
            return {
              title: Schedules.Client + "'s Booking",
              start: new Date(
                Schedules.BookingSchedule[0].DateTime
              ),
              color: colors.green,
              allDay: true,
              draggable: false,
              meta: Schedules,
            }
          });
        })
      );
  }

  fetchEvents(): void {
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


    this.events$ = this.http
      .get('https://localhost:44380/api/Clients/RetrieveBookings')
      .pipe(
        map(( res :  Schedules[] ) => {
          return res.map((Schedules: Schedules) => {
            if(Schedules.BookingStatus == "Requested"){
            return {
              title: Schedules.Client + "'s Requested Booking",
              start: new Date(
                Schedules.BookingRequest.DateTime
              ),
              color: colors.yellow,
              id: Schedules.BookingID,
              //allDay: true,
              draggable: true,
              meta: Schedules,
            };}
            else if(Schedules.BookingStatus == "Confirmed")
            {
            return {
              title: Schedules.Client + "'s Confirmed Booking",
              start: new Date(
                Schedules.BookingSchedule[0].DateTime
              ),
              color: colors.green,
              allDay: true,
              draggable: false,
              meta: Schedules,
            }
            }
            else if(Schedules.BookingStatus == "Advised")
            {
            return {
              title: Schedules.Client + "'s Advised Booking (Awaiting Confirmation)",
              start: new Date(
                Schedules.BookingSchedule[0].DateTime
              ),
              color: colors.yellow,
              allDay: true,
              draggable: false,
              meta: Schedules,
            }
            }
          });
        })
      );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ Schedge: Schedules }>[];
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

  eventClicked(event: CalendarEvent): void 
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.data = event.meta;

   const dialogRef = this.dialog.open(BookingDialog, dialogConfig)
  }

  

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent, action: string): void {
    // event.start = newStart;
    // event.end = newEnd;
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    // this.refresh.next();
    if(confirm("Would you like to advise for this booking?"))
    {     
      localStorage.setItem("DateChosen", newStart.toDateString())
      localStorage.setItem("BookingDetails", JSON.stringify(event.meta))
      this.router.navigateByUrl("advise")
    }
  }

  cancel()
  {
    window.history.back();
  }

}

@Component({
  selector: 'booking-dialog',
  template: `
    <div class="modal-header" >
    <h3 mat-dialog-title><strong>{{title}}</strong></h3>
    <button mat-dialog-close type="button" class="close" mat-dialog-close>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" mat-dialog-content>
    <div>
    <div>
      Status:{{ data.BookingStatus }}
    </div>
      Details:
      <p>Service: {{ data.BookingLines[0].Service}}</p>
      <p *ngIf="data.BookingLines[0].Option">Option: {{data.BookingLines[0].Option}}</p>
    </div>
    
  </div>
  <div class="modal-footer" mat-dialog-actions>
    <button type="button" class="btn btn-outline-secondary"mat-dialog-close>
      Close
    </button>
    <button (click)="Advise()" *ngIf="data.BookingStatus == 'Requested'" type="button" class="btn btn-outline-secondary">
      Advise
    </button>
  </div> `,
  
})
export class BookingDialog implements OnInit
{
  constructor(public dialogRef: MatDialogRef<BookingDialog>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Schedules) {}

  title: string;
  ngOnInit()
  {
    if(this.data.BookingStatus == "Requested")
    {
      this.title = this.data.Client + "'s Requested Booking"
    }
    else if(this.data.BookingStatus == "Confirmed")
    {
      this.title = this.data.Client + "'s Confirmed Booking"
    }
    else if(this.data.BookingStatus == "Advised")
    {
      this.title = this.data.Client + "'s Advised Booking"
    }
  }

  Advise()
  {
    if(confirm("Would you like to advise for this booking?"))
    {     
      localStorage.setItem("DateChosen", this.data.BookingRequest.Dates)
      localStorage.setItem("BookingDetails", JSON.stringify(this.data))
      this.router.navigateByUrl("advise")
      this.dialogRef.close();
    }
  }
}