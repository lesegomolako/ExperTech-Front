import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {ReportsService, Criteria} from '../../API Services/for Reports/reports.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required)
  });

  today = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  displayed = true;
  generated = true;
  
  ngOnInit(): void {
  }

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

  title = 'hw4-frontend';

  ichart=[];
  echart=[];
  incomes: tabledata[];
  expenses:tabledata[];

  constructor(private service: ReportsService, private api: ExperTexhService, private snack: MatSnackBar){}


 
  Criteria: Criteria;
  

 
  incomeTotal =0;
  expenseTotal =0;
  SubmitRequest(){

    if(this.range.invalid)
    {
      alert("Select all the required fields");
      return;
    }

    var tTitle = "Product Sales per category";
  
    this.Criteria = ({
      StartDate: this.range.value.start,
      EndDate: this.range.value.end
    })

    //console.log(this.Criteria)

    this.service.GetFinancialReportingData(this.Criteria, this.api.SessionID).subscribe(response => {

      

      let ikeys = response['Income'].map(d=> d.Name);
      let ivalues = response['Income'].map(d=> d.Total);

      let ekeys = response['Expense'].map(d=> d.Name);
      let evalues = response['Expense'].map(d=> d.Total);

      

      this.incomes = response['Income'];
      this.expenses = response['Expense'];

      if(this.incomes.length==0 && this.expenses.length==0)
      {
        this.snack.open("There is no report data for the selected range.", "OK", {duration: 4000})
        return;
      }

      this.generated = false;
      
      this.incomes.forEach(zz => {
        this.incomeTotal += zz.Total
      })

      this.expenses.forEach(zz => {
        this.expenseTotal += zz.Total
      })

      this.ichart = new Chart('icanvas',{
        type:'pie',
        data:{
          labels: ikeys,
          datasets: [
            {
              data: ivalues,
              fill: true,
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
          
          title: {display: true, text:"Monthly Income"},
        }
      })

      this.echart = new Chart('ecanvas',{
        type:'pie',
        data:{
          labels: ekeys,
          datasets: [
            {
              data: evalues,
              fill: true,
              backgroundColor: [
                "#bc13f3",
                "#ff073a",
                "#cfff04",
                "#ff0055",
                "#48929B",
                "#003171",
                "#FFDDCA",
                "#D9B611",
                "#ff5555",
                "#39ff14",
                "#04d9ff",
                "#ff5721",
                "#fe019a",

              ]
            }
          ]
        },
        options: {   
          
          title: {display: true, text:"Monthly Expenses"},
        }
      })
    })
  }

}

export class tabledata
{
  Name: any;
  Total: any;
}
