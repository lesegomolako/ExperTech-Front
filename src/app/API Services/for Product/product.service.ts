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
    return this.http.get<ProductData[]>(this.url + "Products/GetProduct")
  }

  UpdateProduct(form: ProductData)
  {
    
    return this.http.post(this.url + "Products/UpdateProduct" , form)
  }

  AddProduct(form: ProductData,UploadFile: File, SessionID)
  {
   // alert(form.Name)
    const formData: FormData = new FormData();
    formData.append('Name', form.Name)
    formData.append('CategoryID', form.CategoryID)
    formData.append('Description', form.Description)
    formData.append('Price', form.Price)
    formData.append('QuantityOnHand', form.QuantityOnHand)
    formData.append('Photos', JSON.stringify(form.Photos))
    formData.append('SupplierID', form.SupplierID)
    formData.append('SessionID', SessionID)
    formData.append('Image', UploadFile, UploadFile.name)
    console.log(formData)
    return this.http.post(this.url + 'Products/AddProduct' , formData)
  }

  DeleteProduct(TypeID: any, SessionID)
  {    
    const params = new HttpParams().set('TypeID', TypeID ).set('SessionID', SessionID );
    return this.http.delete(this.url + 'Products/DeleteProduct', {params})
  }
}
