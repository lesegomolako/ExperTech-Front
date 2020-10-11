import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleData } from './sales'

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  formData: SaleData;

  List: SaleData[];

  constructor(private http: HttpClient) { }

  url = "https://localhost:44380/api/"

  getSaleList(): Observable<SaleData[]>
  {
    return this.http.get<SaleData[]>(this.url + "Sale/GetSaleList")
  }

  getProdSaleList(): Observable<SaleData[]>
  {
    return this.http.get<SaleData[]>(this.url + "Sale/GetProductSales")
  }

  SalePayment(form)
  {
    return this.http.post(this.url + "Sale/SalePayment", form)
  }
}
