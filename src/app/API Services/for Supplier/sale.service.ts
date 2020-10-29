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
  //url = 'https://expertechapi.azurewebsites.net/api/';

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

  CancelSale(SessionID, SaleID, AuthorizeID?)
  {
    const params = new HttpParams().set("SessionID", SessionID).set("SaleID", SaleID).set("AuthorizeID", AuthorizeID);
    return this.http.delete(this.url + "Sale/CancelSale", {params});
  }
}
