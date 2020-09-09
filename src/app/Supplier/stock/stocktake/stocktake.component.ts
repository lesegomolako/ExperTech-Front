import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { StockData, StockTakeData } from '../../../API Services/for Supplier/sales';
import { NgForm, Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';





@Component({
  selector: 'app-stocktake',
  templateUrl: './stocktake.component.html',
  styleUrls: ['./stocktake.component.css']
})
export class StocktakeComponent implements OnInit {

  constructor(
    public service: StockService,
    private formBuilder: FormBuilder,
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

    this.Take = JSON.parse(localStorage.getItem('stock'))

    this.service.getStockList().subscribe(res =>
      {
        this.StockList =res;
        
      })

      this.TakeList = this.takeService.getTakeList();

      this.stockTake = this.formBuilder.group({
        adminid: [this.Take.AdminID, Validators.required],
        description: ['',Validators.required],
        price: ['', Validators.required],
        stocktakelines: this.formBuilder.array(
          [
            this.AddStockItems()
          ]
        )
      })
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

    AddStockTake(){

      this.mapValues();
      this.takeService.CreateTake(this.Take).subscribe(ref => {
       if(ref == "success")
       {
        alert("Successfully saved")
        this.route.navigateByUrl("stocktake")
       }
      });
    }

    mapValues()
    {
      this.Take = this.stockTake.value;
      this.Take.AdminID = 1;
    }

    
  }
