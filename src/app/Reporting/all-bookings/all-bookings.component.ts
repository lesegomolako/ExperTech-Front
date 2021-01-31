import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {ReportsService, Criteria} from '../../API Services/for Reports/reports.service';
import {mergeMap, groupBy, map, reduce} from 'rxjs/operators';
import { of} from 'rxjs';
import { stringify } from 'querystring';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {autoTable} from 'jspdf-autotable';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyInfo } from 'src/app/User/company-settings/company-settings.component';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ReportForm: FormGroup;
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  displayed = true;
  generated = true;

  CompanyInfo: CompanyInfo;

  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {     
      this.serv.GetCompanyInfo().subscribe(res => {this.CompanyInfo = res})
      this.ReportForm = new FormGroup({
        start: new FormControl('', Validators.required),
        end: new FormControl('',Validators.required)
      })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  title = 'hw4-frontend';

  chart=[];
  bookings: Object;

  constructor(private service: ReportsService, private serv: ReportingService, private router: Router,
    private api: ExperTexhService, private snack: MatSnackBar){}


 
  Criteria: Criteria;
  
convetToPDF()
{
  var data = document.getElementById('sale');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
   
  var today = this.maxDate.toLocaleDateString()
  var name = "Sales Report-" + today;
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save(name); // Generated PDF
  });
}

  random_rgba(){
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + + o(r()*s) + ',' + o(r()*s) + ', 0.7)';
  }


  statuses;
  services;
  packages;
  SubmitRequest(){
    var tTitle = "Product Sales per category";

    if(this.ReportForm.invalid)
    {
      this.ReportForm.markAllAsTouched();
      alert("Please select all the required criteria")
      return;
    }
  
    this.Criteria = ({
      StartDate: this.ReportForm.value.start,
      EndDate: this.ReportForm.value.end
    })



    this.service.GetBookingSummaryData(this.Criteria, this.api.SessionID).subscribe(response => {
      
      this.statuses = response['Statuses'];
      this.services = response['ServicesBooked'];
      this.packages = response['ServicePackages'];
     
      if(response['Statuses'].length == 0 && response['ServicesBooked'].length == 0 && response['ServicePackages'].length == 0)
      {
        this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
        return;
      }

      this.generated = false;
    })
  }



}
