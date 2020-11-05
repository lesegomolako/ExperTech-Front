import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ReportsService, Criteria } from '../../API Services/for Reports/reports.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  trange = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  ReportForm: FormGroup;

  today = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  displayed = true;
  generated = true;

  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.ReportForm = new FormGroup({
        start: new FormControl('', Validators.required),
        end: new FormControl('', Validators.required),
        criteria: new FormControl('', Validators.required)
      })
    }
    else {
      this.router.navigate(["403Forbidden"])
    }

  }

  title = 'hw4-frontend';

  chart = [];
  products: Object;

  constructor(private service: ReportsService, private snack:MatSnackBar,
     private router: Router, private api: ExperTexhService, private fb: FormBuilder) { }

  public convetToPDF() {
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

 

  Criteria: Criteria;


  AllIncome = false;
  ProductSales = false;
  ActivatePackage = false;
  BookingPayment = false;
  SubmitRequest() {


    if (this.ReportForm.invalid) {
      alert("Please select all the requied fields")
      this.ReportForm.markAllAsTouched();
      return;
    }
    this.displayed = false;
    
    

    this.Criteria = ({
      StartDate: this.ReportForm.value.start,
      EndDate: this.ReportForm.value.end,
      Option: this.ReportForm.value.criteria
    })

    var option = this.ReportForm.value.criteria;
    //console.log(this.Criteria)

    this.service.GetSaleReportingData(this.Criteria, this.api.SessionID).subscribe(response => {

      if (option == 4) 
      {
        this.AllIncome = true;
        this.ProductSales = false;
        this.BookingPayment = false;
        this.ActivatePackage = false;

        if(response['Category'].length == 0)
        {
          this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
          return;
        }

        this.generated = false;
        let keys = response['Category'].map(d => d.Name);
        let values = response['Category'].map(d => d.Total);

        var tTitle = "Total Sales Income per category (in Rands)";

        this.products = response['Category'];

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: keys,
            datasets: [
              {
                data: values,
                fill: false,
                backgroundColor: [
                  "#39ff14",
                  "#04d9ff",
                  "#ff5721",
                  "#fe019a",
                  "#bc13f3",
                  "#ff073a",
                  "#cfff04",
                  "#ff0055",
                  "#48929B",
                  "#003171",
                  "#FFDDCA",
                  "#D9B611",
                  "#ff5555",

                ]
              }
            ]
          },
          options: {

            title: { display: true, text: tTitle },
          }
        })
      }
      else if(option == 1)
      {
        this.AllIncome = false;
        this.ProductSales = true;
        this.BookingPayment = false;
        this.ActivatePackage = false;

        if(response['Category'].length == 0 )
        {
          this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
          return;
        }
        let keys = response['Category'].map(d => d.Name);
        let values = response['Category'].map(d => d.Total);

        var tTitle = "Product sales per category";

        this.products = response['Product'];

        if(!this.products && response['Category'].length == 0)
        {
          this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
          return;
        }

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: keys,
            datasets: [
              {
                data: values,
                fill: false,
                backgroundColor: [
                  "#39ff14",
                  "#04d9ff",
                  "#ff5721",
                  "#fe019a",
                  "#bc13f3",
                  "#ff073a",
                  "#cfff04",
                  "#ff0055",
                  "#48929B",
                  "#003171",
                  "#FFDDCA",
                  "#D9B611",
                  "#ff5555",

                ]
              }
            ]
          },
          options: {

            title: { display: true, text: tTitle },
          }
        })
      }
      else if(option == 2)
      {
        this.AllIncome = false;
        this.ProductSales = false;
        this.BookingPayment = true;
        this.ActivatePackage = false;
        
        let keys = response['Category'].map(d => d.Service);
        let values = response['Category'].map(d => d.NumBookings);

        var tTitle = "Booking payments per service";

        this.products = response['Category'];

        if(response['Category'].length == 0 )
        {
          this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
          return;
        }

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: keys,
            datasets: [
              {
                data: values,
                fill: false,
                backgroundColor: [
                  "#39ff14",
                  "#04d9ff",
                  "#ff5721",
                  "#fe019a",
                  "#bc13f3",
                  "#ff073a",
                  "#cfff04",
                  "#ff0055",
                  "#48929B",
                  "#003171",
                  "#FFDDCA",
                  "#D9B611",
                  "#ff5555",

                ]
              }
            ]
          },
          options: {

            title: { display: true, text: tTitle },
          }
        })
      }
      else if(option == 3)
      {
        this.AllIncome = false;
        this.ProductSales = false;
        this.BookingPayment = false;
        this.ActivatePackage = true;
        
        let keys = response['Category'].map(d => d.Name);
        let values = response['Category'].map(d => d.NumActivated);

        var tTitle = "Activated Service Packages";

        this.products = response['Category'];

        if(response['Category'].length == 0 )
        {
          this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
          return;
        }

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: keys,
            datasets: [
              {
                data: values,
                fill: false,
                backgroundColor: [
                  "#39ff14",
                  "#04d9ff",
                  "#ff5721",
                  "#fe019a",
                  "#bc13f3",
                  "#ff073a",
                  "#cfff04",
                  "#ff0055",
                  "#48929B",
                  "#003171",
                  "#FFDDCA",
                  "#D9B611",
                  "#ff5555",

                ]
              }
            ]
          },
          options: {

            title: { display: true, text: tTitle },
          }
        })
      }

      })
  }



}


