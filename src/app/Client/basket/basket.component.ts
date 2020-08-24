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
  this.basket.forEach(res => {
    this.pro +=(res.Quantity)
      })
}



remove(){

  this.id = this.route.snapshot.params['id'];
  
  this.api.RemoveProduct(this.id).subscribe(data => {
    console.log(data)
  }, error => console.log("Error",error));
}

updateBasket()
{
  alert(this.quantity)
}


}
