import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders , HttpParams } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  GetProdReportingData(form: Criteria)
  {
    let body = JSON.stringify(form)
    return this.http.post("https://localhost:44380/api/Reports/GetProductReportData", form).pipe(map(result => result))
  }

  GetFinancialReportingData(form: Criteria){
    let body = JSON.stringify(form)
    return this.http.post("https://localhost:44380/api/Reports/GetFinancialReportData", form).pipe(map(result => result))
  }

  GetSuppReportingData(form: Criteria){
    let body = JSON.stringify(form)
    return this.http.post("https://localhost:44380/api/Reports/GetSupplierData", form).pipe(map(result => result))
  }

  GetSaleReportingData(form: Criteria){
    let body = JSON.stringify(form)
    return this.http.post("https://localhost:44380/api/Reports/GetSaleReportData", form).pipe(map(result => result))
  }

  GetBookingReportingData(form: Criteria){
    let body = JSON.stringify(form)
    return this.http.post("https://localhost:44380/api//Reports/GetBookingReportData", form).pipe(map(result => result))
  }
 
  
}


export class Criteria{
  StartDate: any;
  EndDate: any;
}