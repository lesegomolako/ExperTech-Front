import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StockData } from '../../../API Services/for Supplier/sales';
//import { ReportingService } from '../../API Services/for User/reporting.service';
//import {Process} from '../../API Services/for User/process';



@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {

  constructor(private service: StockService, private route: Router, private formBuilder: FormBuilder) { }
  StockForm: FormGroup;
  stocks: StockData;
  //StockData= this.service.stocksData;

  
  

  ngOnInit(): void {

    this.StockForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      price: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    })
  }

  // onSubmit()
  // {
  //   console.log(this.StockData)
  //   this.StockData.Description = this.StockForm.value.description;
  //   this.StockData.Name = this.StockForm.value.name;
  //   this.StockData.Price = this.StockForm.value.price;
  //   this.StockData.QuantityInStock = this.StockForm.value.quantity;

  //   this.service.AddStockItems(this.StockData).subscribe(res =>{
  //     if (res == "success")
  //     {
  //       alert("boo")
  //     }
  //   })

  AddStock(stock)
  {
    console.log(stock.value)
    this.service.AddStockItem(stock.value)
    .subscribe(res => {
      if (res == "success")
      {
        alert("Successfully added Stock Item")
        this.route.navigateByUrl("/stock")
      }
    })

  }

}
