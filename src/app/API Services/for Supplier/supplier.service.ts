import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SupplierData } from './sales';
import {Observable} from "rxjs";
import { SupplierOrderData } from './sales';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  formData: SupplierData;
  


  List: SupplierData[];
  
  
  constructor(private http: HttpClient) { }

  url = "https://localhost:44380/api/"

  getSupplierList(): Observable<SupplierData[]>
  {
    return this.http.get<SupplierData[]>(this.url + "Supplier/GetSupplierList")
  }

  getSupplierOrderList(): Observable<SupplierOrderData[]>
  {
    return this.http.get<SupplierOrderData[]>(this.url + "Supplier/GetSupplierOrderList")
  }

  DeleteSupplier(id:any) {
    console.log(id)
    const params = new HttpParams().set("SupplierID", id)
    return this.http.delete(this.url + 'Supplier/DeleteSupplier', 
    {headers: { 'Content-Type': 'application/json'},
    params: params}).subscribe()
  }

  DeleteSupplierOrder(id: any) {
    const params = new HttpParams().set("OrderID", id)
    return this.http.delete(this.url + 'Supplier/DeleteSupplierOrder', 
    {headers: { 'Content-Type': 'application/json'},
    params: params}).subscribe()
  }

  CreateOrder(formData: SupplierOrderData)
  {  
      return this.http.post(
        this.url + 'Supplier/AddSupplierOrder',
        formData
      )
  }

  AddSupplier(formData: SupplierData)
  {
    
    let body = JSON.stringify(this.formData);
    return this.http.post(this.url + "Supplier/AddSupplier", formData);
  }

  EditSupplier(formData: SupplierData, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID )
    return this.http.put(this.url + "Supplier/UpdateSupplier", formData, {params});
  }
}
