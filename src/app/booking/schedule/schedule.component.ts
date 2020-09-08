
import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit} from '@angular/core';
import {startOfDay,endOfDay, subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import {Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {startOfMonth,startOfWeek,endOfWeek,format,getDate} from 'date-fns';
import { Observable } from 'rxjs';


export class Schedule
{
  BookingID: any;
  BookingStatusID: any;
  BookingStatus: string;
  Client: string;
  BookingRequest: 
    {
      Dates: string;
      Time: string;
      DateTime:string;
    }
  ;
  BookingLine:
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})


export class ScheduleComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  events$: Observable<CalendarEvent<{ Schedge: Schedule }>[]>;

  activeDayIsOpen: boolean = false;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // actions: CalendarEventAction[] = [
  //   {
     
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       //this.handleEvent('Edited', event);
  //       this.router.navigateByUrl("Confirm");
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);

  //     },
  //   },
  // ];

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'Booking canceled ',
      
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
      
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'Peding confirmation',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'Confirmed booking',
  //     color: colors.green,
  //     allDay: true,
  //   },
  // ];

  constructor(private modal: NgbModal, 
    private router: Router,
    private http: HttpClient) {}

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events$ = this.events$.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngOnInit(): void {
    this.fetchEvents();
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
      .get('https://localhost:44375/api/Clients/RetrieveBookings')
      .pipe(
        map(( res :  Schedule[] ) => {
          return res.map((Schedules: Schedule) => {
            if(Schedules.BookingStatus == "Requested"){
            return {
              title: Schedules.Client + "'s Requested Booking",
              start: new Date(
                Schedules.BookingRequest.Dates
              ),
              color: colors.yellow,
              
              //allDay: true,
              draggable: true,
            };}
            else if(Schedules.BookingStatus == "Confirmed")
            {
            return {
              title: Schedules.Client + "'s Confirmed Booking",
              start: new Date(
                Schedules.BookingSchedule[0].Dates
              ),
              color: colors.green,
              allDay: true,
              
              draggable: false,
            }
            }
            else if(Schedules.BookingStatus == "Cancelled")
            {
            return {
              title: Schedules.Client + "'s Cancelled Booking",
              start: new Date(
                Schedules.BookingSchedule[0].Dates
              ),
              color: colors.red,
              allDay: true,
              draggable: false,
              
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
    events: CalendarEvent<{ Schedge: Schedule }>[];
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

  eventClicked(event: CalendarEvent<{ Schedge: Schedule }>[]): void 
  {

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
    localStorage.setItem("DateChosen", event.start.toString())
    this.router.navigateByUrl("Advise")
  }
}

