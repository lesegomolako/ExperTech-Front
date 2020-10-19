import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {ReportsService, Criteria} from '../../API Services/for Reports/reports.service';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-report',
  templateUrl: './supplier-report.component.html',
  styleUrls: ['./supplier-report.component.css']
})
export class SupplierReportComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required)
  });

  today = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  
  displayed = true;
  generated = true;

  ngOnInit(): void {

    if(this.api.RoleID != "2")
    {
      this.router.navigate(["403Forbidden"])
      return;
    }
  }

  title = 'hw4-frontend';

  chart=[];
  products: Object;

  constructor(private service: ReportsService, private router: Router, private snack:MatSnackBar ,private api:ExperTexhService){}

 
  Criteria: Criteria;

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


  SubmitRequest(){
    
    if(this.range.invalid)
    {
      alert("Please click all the required fields")
      this.range.markAllAsTouched();
      return;
    }

    var tTitle = "Stock Orders per supplier";
  
    this.Criteria = ({
      StartDate: this.range.value.start,
      EndDate: this.range.value.end
    })

    //console.log(this.Criteria)

    this.service.GetSuppReportingData(this.Criteria, this.api.SessionID).subscribe(response => {

      let keys = response['Stock'].map(d=> d.Name);
      let values = response['Stock'].map(d=> d.NumOrders);

      this.products = response['Totals'];
      
      if(response['Category'].length == 0 && !this.products)
      {
        this.snack.open("There is no report data for this selected range", "OK", {duration:3000})
        return;
      }

      this.generated = true;
      this.chart = new Chart('canvas',{
        type:'pie',
        data:{
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
          
          title: {display: true, text:tTitle},
        }
      })
    })
  }



}
