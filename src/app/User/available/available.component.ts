import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process, Schedule} from '../../API Services/for User/process';
import { User } from '../../Staff/admin-register/admin-register.component';

export class AvailData {
  StartDate: any;
  EndDate: any;
  StartTime: any;
  EndTime: any;
  Avail: any;
}

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadList();

    this.AvailabilityForm = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      StartTime: ['', Validators.required],
      EndTime: ['', Validators.required],
      Avail: [],
    });
  }

  loadList() {
    this.List = this.service.getTime();
    this.List = this.service.getTime()
  }

  Schedge: AvailData;
  user: any;
  addAvailability() {
    this.Schedge = this.AvailabilityForm.value;
    console.log(this.Schedge);
    this.service.Schedule(this.Schedge).subscribe((ref) => {
      if (ref == 'success') alert('hello');
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
}
