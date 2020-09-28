import { Component  } from '@angular/core';
import { SaleData } from '../../../API Services/for Supplier/sales';
import { SaleService } from '../../../API Services/for Supplier/sale.service';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormsModule } from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts"; 
import { NgModule } from '@angular/core'; 
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-saleinvoice',
  templateUrl: './saleinvoice.component.html',
  styleUrls: ['./saleinvoice.component.css']
})


export class SaleinvoiceComponent {

  constructor(
    public dialog: MatDialog,
    public service: SaleService, 
    private router: Router,
    private api: ExperTexhService
    ) { 
      
    }

    clientObject = JSON.parse(localStorage.getItem('sale'))

    SaleList: Observable<SaleData[]>
    
    
    
  
  ngOnInit() {
    
  }

 


  invoice = new SaleData();

  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'ExperTech',
          fontSize: 16,
          alignment: 'center',
          color: 'green',
          img: 'logo.png' 
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'green'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.ClientID,
                bold:true
              },
              { text: this.invoice.ClientName },
              { text: this.invoice.ClientEmail },
              { text: this.invoice.ClientContact }
            ],
            [
              {
                text: this.invoice.Date,
                alignment: 'right'
              },
              { 
                text: `Date: ${new Date().toLocaleString()}`,  
                alignment: 'right' 
              },
              {  
                text: `Sale InvoiceNo: ${((Math.random() * 1000).toFixed(0))}`,  
                alignment: 'right'  
              }  
            ]
          ]
        },
        {
          text: 'Sale Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            head: ['ProductName', 'Price', 'Quantity', 'Payment'],
            body: [] 
              
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: this.invoice.SaleType,
            margin: [0, 0 ,0, 15]          
        },
        {
          columns: [
            [{ qr: `${this.invoice.ClientName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can not be retunred after pick up.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };


    if (action ==='download') {
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }
  }

  addclientobject() {
    this.clientObject.push( new SaleData());
  }
}

  
