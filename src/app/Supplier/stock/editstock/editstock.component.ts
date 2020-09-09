import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { StockData } from '../../../API Services/for Supplier/sales';


@Component({
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.css']
})
export class EditstockComponent implements OnInit {

  constructor( private router: Router, private formBuilder: FormBuilder, private service: StockService) { }
  stock: StockData;
  EditForm: FormGroup;

  ngOnInit(): void {
    this.stock= JSON.parse(localStorage.getItem('stock'));
    this.EditForm = this.formBuilder.group({
      itemid: [this.stock.ItemID],
      name: [this.stock.Name, Validators.required],
      description: [this.stock.Description, Validators.required],
      price: [this.stock.Price, Validators.required],
      quantityinstock: [this.stock.QuantityInStock, Validators.required]
    })
  }
  EditStockItem(stock)
  {
    console.log(stock.value)
    this.service.EditStock(stock.value)
    .subscribe(res => {
      if (res == "success")
      {
        alert("Successfully Updated")
        this.router.navigateByUrl("/stock")
      }
    })

  }

  

}
