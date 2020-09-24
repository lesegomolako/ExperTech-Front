import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ BasketLine} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
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

    if(this.api.RoleID == "1")
    {
      this.quantity = 0;

      this.id = this.route.snapshot.params['id'];

      
      this.api.ViewBasket(this.api.SessionID).subscribe(data => {
        console.log(data)
        this.basket = data;
        this.cal();
        this.item();

      }, error => console.log("error edit component",error));
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  

}
list(){
  this.router.navigate(['basket']);
}

cal(){
  
  this.basket.forEach(res => {
this.total =(res.Quantity * res.Product.Price)
  })
  console.log(this.total)
}

item(){
  this.pro=0
  this.basket.forEach(res => {
    
    this.pro = (res.Quantity)
      })

  this.api.badgeCount = this.pro;   
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
  this.api.getBadgeCount()
}

updateBasket(event,line:BasketLine)
{
  var num = Number(event.target.value)
  line.Quantity=num;
  this.item();
  console.log("New Value",line)
  this.api.Updateproduct(line).subscribe(data => {
  }, error => console.log("error edit component",error));
  
}

cancel()
  {
    window.history.back();
  }
}
