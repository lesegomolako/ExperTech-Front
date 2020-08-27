import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockData } from './stock.service.spec';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  url = "https://localhost:44391/api/"

  stocksData : StockData;

  getStockList(): Observable<StockData[]>
  {
    return this.http.get<StockData[]>(this.url + "Stockitem/GetStockitemList")
  }

  DeleteStockItem(id:any) 
  {
    const params = new HttpParams().set('ItemID', id)
    return this.http.delete(this.url + 'StockItem/DeleteStockItem', {headers: {'Content-Type': 'application/json'}, 
    params: params} )
  }
}
