import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductData } from 'src/app/API Services/for Product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public service: ProductService, private router: Router) { }
  ProductList :Observable<ProductData[]>;

  ngOnInit(): void {

    this.ProductList = this.service.getProducts();
  }

  addProduct()
  { 
    this.service.ProductForm = null;
    this.router.navigateByUrl("/EditProduct")
  }

  editProduct(data: ProductData)
  {
     this.service.ProductForm = data;
     this.router.navigateByUrl("/EditProduct")
  }

  deleteProduct(data: ProductData)
  {
    this.service.ProductForm = data;
    this.router.navigateByUrl("/DeleteProduct")
  }

}
