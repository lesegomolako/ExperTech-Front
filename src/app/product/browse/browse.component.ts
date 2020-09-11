import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Product,BasketLine} from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import {ProductService} from '../../API Services/for Product/product.service'
import { ProductData } from 'src/app/API Services/for Product/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.sass']
})
export class BrowseComponent implements OnInit {

  basketID="1"; // PLEASE IMPLEMENT THE SESSION SO THAT THE USER GETS THEIR BASKET ID FROM THE API
  id: any;
  product :  ProductData[];
  basket: BasketLine[];
  name: string;
  submitted = false;
  productForm: FormGroup;

  myImages;


  constructor(public dialog: MatDialog, private api: ExperTexhService,
     private router: Router,private route: ActivatedRoute,
     private service: ProductService,
     public domSanitizer: DomSanitizer) { }
  openDialog() {
    confirm("Successfully added to product")
  }

  ngOnInit(): void {
 
    this.id = this.route.snapshot.params['id'];
    
    this.service.getProducts().subscribe((data: any) => {
      console.log(data)
      this.product = data;
      console.log(this.product)
      this.myImages = data.Image
      console.log(data.Image)
      //console.log(this.myImages)
      // this.product.forEach(p=>{
      //   p.SelectedQuantity=0;
      // })
    }, error => console.log("error edit component",error));
    

}
list(){
  this.router.navigate(['browse']);
}

setQuantity(newValue,item:Product)
{
  console.log("SETTING",newValue.target.value)
  item.SelectedQuantity = Number(newValue.target.value)
}


addproduct(BasketProduct:Product){
  this.id = this.route.snapshot.params['id'];
    var _basketLine:BasketLine = {
      BasketID:this.basketID,
      Product:BasketProduct,
      ProductID:BasketProduct.ProductID,
    }

    if(BasketProduct.SelectedQuantity > BasketProduct.QuantityOnHand)
    {
      alert("You've selected too much")
      return;
    }

    if(BasketProduct.SelectedQuantity <= 0)
    return;
    
    _basketLine.Quantity=BasketProduct.SelectedQuantity;
    
    // Else if(BasketProduct.ProductID == BasketProduct.ProductID)
    // {
    //   alert("You've selected this product already")
    //   return;
    // }




  this.api.Addproduct(this.basketID,_basketLine).subscribe(data => {
    this.basket = data;
  }, error => console.log("error edit component",error));
}
}
