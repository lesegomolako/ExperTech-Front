import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders , HttpParams } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  GetProdReportingData(form: Criteria, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post("https://localhost:44380/api/Reports/GetProductReportData", form, {params}).pipe(map(result => result))
  }

  GetFinancialReportingData(form: Criteria, SessionID){
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post("https://localhost:44380/api/Reports/GetFinancialReportData", form, {params}).pipe(map(result => result))
  }

  GetSuppReportingData(form: Criteria, SessionID){
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post("https://localhost:44380/api/Reports/GetSupplierData", form, {params}).pipe(map(result => result))
  }

  GetSaleReportingData(form: Criteria, SessionID){
    const params = new HttpParams().set("SessionID", SessionID)
    let body = JSON.stringify(form)
    return this.http.post("https://localhost:44380/api/Reports/GetSaleReportData", form, {params}).pipe(map(result => result))
  }

  GetBookingReportingData(form: Criteria, SessionID){
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post("https://localhost:44380/api//Reports/GetBookingReportData", form, {params}).pipe(map(result => result))
  }

  GetBookingSummaryData(form: Criteria, SessionID){
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post("https://localhost:44380/api//Reports/GetAllReports", form, {params}).pipe(map(result => result))
  }
 
  
}


export class Criteria{
  StartDate: any;
  EndDate: any;
  Option?: any;
}