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

    clientObject : SaleData;

    SaleList: Observable<SaleData[]>
    
    
    
  
  ngOnInit() {
    if(this.api.RoleID == "2")
    {
      this.clientObject = JSON.parse(localStorage.getItem('sale'))
      console.log(this.clientObject)
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
    
  }

 


  invoice = new SaleData();

  generatePDF(action = 'open') {

    var rows = [];
    let length: number = this.clientObject.Products.length;
    var i;
    var Total = 0;
    

    for (i = 0; i < length; i++) {
      rows.push([this.clientObject.Products[i].Name, this.clientObject.Products[i].Quantity, this.clientObject.Products[i].Price])
      Total += this.clientObject.Products[i].Price
    }

    let docDefinition = {
      content: [
           
	    
        {text:" "},
        {
           style:"none",
           table: {
               	widths: ['auto', '*'],
               	heights: 100,
				body: 
				[
					[ 
					    [
					         {text:" "},
                            { text: [{text: "Company Name: ", bold: true },{text: "Exhilaration Beauty & Hair Salon"}]},
                            { text: [{text: "Address: ", bold: true },{text: "1000 King Street "}]},
                            { text: [{text: "Contact Number: ", bold: true },{text: "093093093"}]},
                        ],
					    {
                            image: 'data:image/png;base64,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', 
                            fit: [70, 100],
                            alignment: 'right'
                        },
					],
					
				],
			
			},
		    layout: "noBorders"
		
        },
        {text:" "},
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'green'
        },
        {text:" "},
        {
            columns:
             [
                 [{
                    text: 'Customer Details:',
                    style: 'sectionHeader',
                    decoration: 'underline'
                 }],
                [{
                   text: 'Invoice Details:',
                   style: 'sectionHeader',
                   decoration: 'underline', 
                  alignment: 'right'
                }],
        ]
        },
        {
            columns: 
            [
                [
                  { text: [{text: "Name: ", bold: true },{text: this.clientObject.ClientName + " "+ this.clientObject.ClientSurname}]},
                  { text: [{text: "Email: ", bold: true },{text: "lsgmlk1@gmail.com"}]},
                  { text: [{text: "Contact Number: ", bold: true },{text: "093093093"}]},
                ],
                [
                  { 
                    text: `Date: ${new Date().toDateString()}`,  
                    alignment: 'right' 
                  },
                  {  
                    text: `Sale InvoiceNo: ${((Math.random() * 1000).toFixed(0))}`,  
                    alignment: 'right'  
                  }  
                ]
            ]
        },
        {text: " "},
        {
          text: 'Sale Details',
          style: 'sectionHeader',
          decoration: 'underline', 
        },
        {text: " "},
        {
          table: {
         headerRows: 1,
         widths: [250, 130, 100],
         body: [ [{text: 'Product Name', style: 'tableHeader'}, {text: 'Quantity', style: 'tableHeader'}, {text: 'Price (R)', style: 'tableHeader'}]],
          }
        },
        {
          table: {
            widths: [250, 130, 100],
            body: rows
          },
        },
        {
             table: {
            headerRows: 1,
            widths: [389, 100],
            body: [ [{text: 'Total', style: 'tableHeader'}, {text: 'R ' +Total, style: 'tableHeader'}]],
          }
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can not be retunred after pick up.',
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

  // addclientobject() {
  //   this.clientObject.push( new SaleData());
  // }
}

  
