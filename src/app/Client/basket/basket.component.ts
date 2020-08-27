import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ BasketLine} from 'src/app/client';
import { ExperTexhService } from 'src/app/exper-texh.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {
  id: any;
  basket :  BasketLine[];
  name: string;
 quantity: any;
 total =0;
 pro=0;

  constructor(public dialog: MatDialog,private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }
  openDialog() {
    confirm("Successfully sent")
  }

  ngOnInit()  {
    //this.basket = new BasketLine();

    this.quantity = 2;

    this.id = this.route.snapshot.params['id'];
    
    this.api.ViewBasket(this.id).subscribe(data => {
      console.log(data)
      this.basket = data;
      this.cal();
      this.item();

    }, error => console.log("error edit component",error));
    
  

}
list(){
  this.router.navigate(['ClientProfile']);
}

cal(){
  
  this.basket.forEach(res => {
this.total +=(res.Quantity * res.Product.Price)
  })

}

item(){
  this.pro=0
  this.basket.forEach(res => {
    
    this.pro +=(res.Quantity)
      })
}



remove(item_in_basket:BasketLine){

  console.log("REMOVE LINE :"+item_in_basket.Product.Name)
  this.api.RemoveProduct(item_in_basket.BasketID,item_in_basket.ProductID).subscribe(data => {
    console.log("REMOVED PRODUCT RESULT",data)
    for(var i =0;i<this.basket.length;i++)
    {
      var single:BasketLine = this.basket[i];
      if(single.ProductID == item_in_basket.ProductID)
      this.basket.splice(i,1)
    }
    //alert("Successfully removed Product "+item_in_basket.Product.Name)
  }, error => console.log("Error",error));
}

updateBasket(event,line:BasketLine)
{
  var num = Number(event.target.value)
  line.Quantity=num;
  this.item();
  console.log("New Value",line)
  this.api.Addproduct(line.BasketID,line).subscribe(data => {
  }, error => console.log("error edit component",error));
}


}
