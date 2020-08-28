import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProductData} from './product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  url = "https://localhost:44380/api/"

  ProductForm: ProductData;

  getProducts(): Observable<ProductData[]>
  {
    return this.http.get<ProductData[]>(this.url + "Products/GetProducts")
  }

  UpdateProduct(form: ProductData)
  {
    
    return this.http.post(this.url + "Products/UpdateProduct" , form)
  }

  AddProduct(form: ProductData)
  {
    return this.http.post(this.url + 'Products/AddProduct' , form)
  }

  DeleteProduct(TypeID: any)
  {    
    const params = new HttpParams().set('TypeID', TypeID );
    return this.http.delete(this.url + 'Products/DeleteProduct', {params})
  }
}
