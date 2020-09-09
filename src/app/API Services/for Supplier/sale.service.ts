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

  url = "https://localhost:44391/api/"

  getSaleList(): Observable<SaleData[]>
  {
    return this.http.get<SaleData[]>(this.url + "Sale/GetSaleList")
  }
}
