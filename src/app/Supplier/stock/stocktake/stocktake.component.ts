import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { StockData, StockTakeData } from '../../../API Services/for Supplier/sales';
import { NgForm, Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-stocktake',
  templateUrl: './stocktake.component.html',
  styleUrls: ['./stocktake.component.css']
})
export class StocktakeComponent implements OnInit {

  constructor(
    public service: StockService, private snack: MatSnackBar, 
    private formBuilder: FormBuilder,
    private api: ExperTexhService,
    private takeService: StockService,
    private http: HttpClient,
    private route: Router ){} 

  StockList: StockData[];
  stockTake: FormGroup;
  Take: StockTakeData;

  TakeList: Observable<StockTakeData[]>;
  Quantity = 0;
  

  countQuantity(value)
  {
    this.Quantity += value
  }


  ngOnInit(): void {

   if(this.api.RoleID == "2")
    {
      this.service.getStockList().subscribe(res =>
        {
          this.StockList =res;
          
        })

      this.stockTake = this.formBuilder.group({
          description: ['',Validators.required],
          stocktakelines: this.formBuilder.array(
            [
              this.AddStockItems()
            ]
          )
        })
    }
    else
    {
      this.route.navigate(["403Forbidden"])
    }
  }

  AddForm()
  {
    (<FormArray>this.stockTake.get('stocktakelines')).push(this.AddStockItems());
  }
  DeleteForm(ItemID: any): void
  {
    (<FormArray>this.stockTake.get('stocktakelines')).removeAt(ItemID);
  }

  AddStockItems(): FormGroup
    {
      return this.formBuilder.group({
        quantity:  ['', Validators.required],
        itemid: ['', Validators.required],
      })
    }

AddStockTake()
{
  if(this.stockTake.invalid)
  {
    alert("Fill in all the required details")
    return;
  }
  this.mapValues();
  this.takeService.CreateTake(this.Take, this.api.SessionID).subscribe(ref => {
    if(ref == "success")
    {
      this.snack.open("Stock take successfully saved", "OK", {duration:3000})
      this.route.navigate(["stock"])
    }
    else
    {
      console.log(ref)
      this.snack.open("Something went wrong", "OK", {duration:3000})
    }
    
  },error => {console.log(error),  this.snack.open("Something went wrong", "OK", {duration:3000})});
}

mapValues()
{
  this.Take = this.stockTake.value;
}

    
}
