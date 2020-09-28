import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { StockService } from '../../../API Services/for Supplier/stock.service';
import { StockData, WriteOffData } from '../../../API Services/for Supplier/sales';
import { NgForm, Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';


@Component({
  selector: 'app-writeoff',
  templateUrl: './writeoff.component.html',
  styleUrls: ['./writeoff.component.css']
})
export class WriteoffComponent implements OnInit {
  constructor(
  public service: StockService,
  private formBuilder: FormBuilder,
  private writeService: StockService,
  private http: HttpClient,
  private route: Router,
  private api: ExperTexhService ) { }


  StockList: StockData[];
  writeOffForm: FormGroup;
  Write: WriteOffData;

  WriteList: Observable<WriteOffData[]>;
  Quantity = 0;

  countQuantity(value)
  {
    this.Quantity = value
  }



  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {
      this.service.getStockList().subscribe(res =>
        {
          this.StockList =res;
          
        })

      this.writeOffForm = this.formBuilder.group({
          description: ['', Validators.required],      
          writeofflines: this.formBuilder.array(
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
    (<FormArray>this.writeOffForm.get('writeofflines')).push(this.AddStockItems());
  }
  DeleteForm(ItemID: any): void
  {
    (<FormArray>this.writeOffForm.get('writeofflines')).removeAt(ItemID);
  }

  AddStockItems(): FormGroup
    {
      return this.formBuilder.group({
        quantity: ['', Validators.required],
        itemid: ['', Validators.required],
        reason: ['',Validators.required]
      })
    }

AddWriteOff()
{
  if(this.writeOffForm.invalid)
  {
    alert("form is invalid")
    return;
  }

  this.mapValues();
  this.writeService.CreateWrite(this.Write, this.api.SessionID).subscribe(ref => {
    if(ref == "success")
    {
      alert("Successfully saved")
      this.route.navigateByUrl("writeoff")
    }
  });
    
}

    mapValues()
    {
      this.Write = this.writeOffForm.value;
      // this.Write.AdminID = 1;
    }

    
  }
