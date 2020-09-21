import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { HttpClient } from '@angular/common/http';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { Schedule } from '../schedule/schedule.component';
import { Router} from '@angular/router'

@Component({
  selector: 'app-advise',
  templateUrl: './advise.component.html',
  styleUrls: ['./advise.component.css']
})
export class AdviseComponent implements OnInit {

  constructor(private service: ReportingService, private router: Router,
    private api:ExperTexhService, private http:HttpClient, private fb: FormBuilder) { }
  EmployeeList: []
  Times: [];
  chosenDate: any;
  Booking: Schedule;
  
  AdviseForm: FormGroup;

  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
    this.chosenDate = localStorage.getItem("DateChosen")
    this.http.get<[]>(this.api.url + "Employees/getEmployee").subscribe(res =>
      {
        this.EmployeeList = res;
      })

    this.http.get<[]>(this.api.url + "Booking/getTimes")
    .subscribe(res => {this.Times = res})
    
    this.Booking = JSON.parse(localStorage.getItem("BookingDetails"))

    console.log(this.Booking)

    this.AdviseForm = this.fb.group({
      employeeid: [''],
      timesid: ['']
    })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }


  AdviseBooking(form)
  {
    const BookingData =
    {
      SessionID: this.api.SessionID,
      BookingID: this.Booking.BookingID,
      EmployeeID: form.value.employeeid,
      RequestedID: this.Booking.BookingRequest.RequestedID,
      Date: new Date(this.chosenDate).toLocaleDateString(),
      TimeID: form.value.timesid
    }

    console.log(BookingData)
    this.api.AdviseBooking(BookingData).subscribe(res => 
      {
        if (res = "success")
        {
          alert("Booking advise successfully sent to client")
          this.router.navigateByUrl("/schedule")
        }
      })

  }

  cancel()
  {
    window.history.back();
  }

}
