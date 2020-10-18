import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {ReportsService, Criteria} from '../../API Services/for Reports/reports.service';
import {mergeMap, groupBy, map, reduce} from 'rxjs/operators';
import { of} from 'rxjs';
import { stringify } from 'querystring';
import {jsPDF} from 'jspdf';
import {autoTable} from 'jspdf-autotable';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';


@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  today = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  displayed = true;
  generated = true;
  
  ngOnInit(): void {
  }

  title = 'hw4-frontend';

  ichart=[];
  echart=[];
  incomes: tabledata[];
  expenses:tabledata[];

  constructor(private service: ReportsService, private api: ExperTexhService){}

  DownloadPDF()
  {
    this.Criteria = ({
      StartDate: this.range.value.start,
      EndDate: this.range.value.end
    })

    // this.service.GetSaleReportingData(this.Criteria).subscribe(res => {
    //   var doc = new jsPDF();

    //   var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    //   var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    //   let length = res['Category'].length;
    //   let titles = res['Category'].map(z => z.Name);
    //   let totals = res['Category'].map(z => z.Total);

    //   let finalY = 120;
    //   var newCanvas = <HTMLCanvasElement>document.querySelector('#canvas');

    //   var newCanvasImg = newCanvas.toDataURL("image/png", 1.0 );

    //   doc.setFontSize(35)

    //   doc.text("Sale Report", (pageWidth/2) - 30, 15)
    //   doc.addImage(newCanvasImg, 'PNG', 25,25,160,100);
    //   doc.setFontSize(14)
    //   for (let i=0; i<length; i++)
    //   {
    //     doc.text("Product Category: "+titles[i], (pageWidth/2)*15, finalY + 23)
    //     doc.autoTable({startY: finalY + 25, html: '#testing' + i, useCss:true, head: [
    //       ['Product Name', "Total Products Sold", "Total Price (R)"]]})
    //       finalY = doc.autoTable.previous.finalY
    //   }

    //   doc.save('table.pdf');
    // });
  }
 
  Criteria: Criteria;
  

  random_rgba(){
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + + o(r()*s) + ',' + o(r()*s) + ', 0.7)';
  }

  incomeTotal =0;
  expenseTotal =0;
  SubmitRequest(){
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

      console.log(evalues);

      this.incomes = response['Income'];
      this.expenses = response['Expense'];
      
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
