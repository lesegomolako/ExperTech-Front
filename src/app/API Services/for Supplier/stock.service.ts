import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockData, StockTakeData, WriteOffData } from './sales';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  List: StockData[];

  formData: StockData;

  constructor(private http: HttpClient) { }

  url = "https://localhost:44391/api/"

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

  AddStockItem(formData: StockData)
   {
    let body = JSON.stringify(this.formData);
    return this.http.post(this.url + "StockItem/AddStockItem", formData);

   } 
   EditStock(formData: StockData)
  {
    
    let body = JSON.stringify(this.formData);
    return this.http.put(this.url + "StockItem/UpdateStockItem", formData);
  }

  getTakeList(): Observable<StockTakeData[]>
  {
    return this.http.get<StockTakeData[]>(this.url + "StockTake/AddStockTake")
  }

  getWriteList(): Observable<WriteOffData[]>
  {
    return this.http.get<WriteOffData[]>(this.url + "StockWriteOff/AddStockWriteOff")
  }

  CreateTake(formData: StockTakeData)
  {
    return this.http.post(
      this.url + 'StockTake/AddStockTake',
      formData
    )
  }

  CreateWrite(formData: WriteOffData)
  {
    return this.http.post(
      this.url + 'StockWriteOff/AddStockWriteOff',
      formData
    )
  }
  
}
