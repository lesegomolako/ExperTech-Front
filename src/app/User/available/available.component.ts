import { ThemePalette } from '@angular/material/core';
import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit, Inject} from '@angular/core';
import {startOfDay,endOfDay, subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import {Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {startOfMonth,startOfWeek,endOfWeek,format,getDate} from 'date-fns';

import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process, Schedule} from '../../API Services/for User/process';
import { User } from '../../Staff/admin-register/admin-register.component';
import {Schedules} from '../../Booking/schedule/schedule.component'

export class AvailData {
  StartDate: any;
  EndDate: any;
  StartTimeID: any;
  EndTimeID: any;
  StatusID: any;
  Avail: any;
}

export class CalData
{
  DateID: any;
  Dates:Date;
  TimeID:any;
  StartTime:any;
  EndTime:any;
  StatusID:any
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
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.sass'],
})
export class AvailableComponent implements OnInit {
  minDate = new Date(new Date().setDate(new Date().getDate() + 1));
  minEndDate: Date;
  maxDate = new Date(new Date().setDate(new Date().getDate() + 2));
  

  //create variable  1minDate = new Date(new Date().setDate(new Date().getDate()+1))
  List: Observable<Schedule[]>;
  Dates: Observable<Schedule[]>;

  AvailabilityForm: FormGroup;

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
    private formBuilder: FormBuilder,
    private api: ExperTexhService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() 
  {

    if(this.api.RoleID == "3")
    {
      this.fetchEvents();

      this.loadList();

      this.AvailabilityForm = this.formBuilder.group({
        StartDate: ['', Validators.required],
        EndDate: ['', Validators.required],
        StartTimeID: ['', Validators.required],
        EndTimeID: ['', Validators.required],
        Avail: [],
      });
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
   
  }

  loadList() {
    this.List = this.service.getTime();
    this.List = this.service.getTime()
  }

  Schedge: AvailData;
  user: any;
  addAvailability() {

    if(this.AvailabilityForm.invalid)
    {
      this.AvailabilityForm.markAllAsTouched();
      return;
    }
    this.Schedge = this.AvailabilityForm.value;
    console.log(this.Schedge);
    this.service.Schedule(this.Schedge, this.api.SessionID).subscribe((ref) => {

      if (ref == 'success') 
      {
        alert("Availibility successfully updated");
        this.AvailabilityForm.reset();
        this.fetchEvents();
      }
    });
  }

  Present() {
    this.service.AvailableorNot(this.user).subscribe((ref) => {
      this.loadList();
    });
  }

  setMinDate() {
    this.minEndDate = this.AvailabilityForm.value.StartDate;
    console.log(this.minEndDate);
  }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  hide = true;
  matcher = new ErrorStateMatcher();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  events$: Observable<CalendarEvent<CalData>[]>;
  

  events:CalendarEvent<{ Schedge: Schedules }>[];

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
  

  fetchEvents()
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
      'SessionID', this.api.SessionID);

    


    this.events$ = this.http
      .get('https://localhost:44380/api/Employees/DisplayEmployeeSchedule', {params})
      .pipe(
        map(( res :  CalData[] ) => {
          return res.map((Avail: CalData) => {
            if(Avail.StatusID == 1)
            {
              return {
                title: Avail.StartTime + "-" + Avail.EndTime,
                start: new Date(
                  Avail.Dates
                ),
                color: colors.green,
                allDay: true,
                draggable: false
              }
            }
            else if(Avail.StatusID == 2)
            {
              return {
                title: Avail.StartTime + "-" + Avail.EndTime,
                start: new Date(
                  Avail.Dates
                ),
                color: colors.yellow,
                allDay: true,
                draggable: false
              }
            }
            else
            {
              return {
                title: Avail.StartTime + "-" + Avail.EndTime,
                start: new Date(
                  Avail.Dates
                ),
                color: colors.red,
                allDay: true,
                draggable: false
              }
            }
           
                 
                    // return {
                    //   title: res.StartTime + "-" + res.EndTime,
                    //   start: new Date(
                    //     Avail.Dates
                    //   ),
                    //   color: colors.yelloq,
                    //   allDay: true,
                    //   draggable: false
                    // }
                  })                 
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
