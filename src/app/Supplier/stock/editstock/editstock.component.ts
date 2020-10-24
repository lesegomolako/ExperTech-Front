import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { StockCategory, StockData } from '../../../API Services/for Supplier/sales';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';


@Component({
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.css']
})
export class EditstockComponent implements OnInit {

  constructor( private router: Router, private formBuilder: FormBuilder,
     private service: StockService, private api: ExperTexhService) { }
  stock: StockData;
  EditForm: FormGroup;
  Categories: StockCategory[];


  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
      this.stock= JSON.parse(localStorage.getItem('stock'));
      console.log(this.stock)
      this.EditForm = this.formBuilder.group({
        itemid: [this.stock.ItemID],
        name: [this.stock.Name, [Validators.required, Validators.maxLength(50)]],
        description: [this.stock.Description, Validators.maxLength(50)],
        price: [this.stock.Price, [Validators.required, Validators.min(0)]],
        quantityinstock: [this.stock.QuantityInStock], 
        categoryid: [this.stock.CategoryID, Validators.required],
        size: [this.stock.Size, [Validators.required, Validators.min(0)]],
        color: [this.stock.Color, Validators.maxLength(50)]
      })
      
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  get f()
  {
    return this.EditForm.controls;
  }

  EditStockItem(stock)
  {
    
    this.service.EditStock(stock.value, this.api.SessionID)
    .subscribe(res => {
      if (res == "success")
      {
        alert("Successfully Updated")
        localStorage.removeItem('stock')
        this.router.navigateByUrl("/stock")     
      }
    })

  }

  

}
