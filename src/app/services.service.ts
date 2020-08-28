import { Injectable } from '@angular/core';
import{ServiceTypeData, ServiceData, ServiceOptionData, PackageData} from './services'
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  url = "https://localhost:44380/api/"

//*************************Service Type************************************
  
  TypeData: ServiceTypeData = null;

  getServiceTypes(): Observable<ServiceTypeData[]>
  {
    return this.http.get<ServiceTypeData[]>(this.url+"Services/GetServiceType")
  }

  UpdateServiceType(form: ServiceData)
  {
    
    return this.http.post(this.url + "Services/UpdateServiceType" , form)
  }

  AddServiceType(form: ServiceTypeData)
  {
    return this.http.post(this.url + 'Services/AddServiceType' , form)
  }

  DeleteServiceType(TypeID: any)
  {    
    const params = new HttpParams().set('TypeID', TypeID );
    return this.http.delete(this.url + 'Services/DeleteServiceType', {params})
  }

  //************************Service Option *******************/
  OptionData: ServiceOptionData = null;

  getServiceOptions(): Observable<ServiceOptionData[]>
  {
    return this.http.get<ServiceOptionData[]>(this.url+"Services/GetServiceOption")
  }

  UpdateServiceOption(form: ServiceOptionData)
  {
    
    return this.http.post(this.url + "Services/UpdateServiceOption" , form)
  }

  AddServiceOption(form: ServiceOptionData)
  {
 
    return this.http.post(this.url + 'Services/AddServiceOption' , form)
  }

  DeleteServiceOption(OptionID: any)
  {    
    const params = new HttpParams().set('OptionID', OptionID );
    return this.http.delete(this.url + 'Services/DeleteServiceType', {params})
  }


  //*******************Service Package ******************/
  PackageData: PackageData = null;

  getServicePackages(): Observable<PackageData[]>
  {
    return this.http.get<PackageData[]>(this.url+"Services/RetrieveServicePackage")
  }

  AddServicePackage(form: PackageData)
  {
 
    return this.http.post(this.url + 'Services/CreateServicePackage' , form)
  }

  DeleteServicePackage(TypeID: any)
  {    
    return this.http.delete(this.url + 'Services/RemoveServicePackage' , TypeID)
  }

  formData: ServiceData;
  List: ServiceData[];
  user: any;

  ///********************************************************Admin CRUD*********************************************************************
  readAdmin(): Observable<ServiceData[]> {
    return this.http.get<ServiceData[]>(this.url + 'Admin/getAdmin');
  }
  createAdmin(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(this.url + 'Admin/addAdmin', formData);
    }
  }
  updateAdmin(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(this.url + 'Admin/updateAdmin', formData);
    }
  }
  deleteAdmin(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      };
      return this.http.delete<ServiceData>(
        this.url + 'Admin/deleteAdmin',
        httpOptions
      );
    } else {
      return null;
    }
  }
  ///********************************************************Client CRUD*********************************************************************
  readClient(): Observable<ServiceData[]>{
    return this.http.get<ServiceData[]>(this.url + 'Client/getClient');
    }
  walkinClient(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'Admin/walkInClient',
        formData
      );
    }
  }

  updateClient(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<ServiceData>(this.url + 'User/updateClient', formData);
    }
  } 
  deleteClient(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      };
      return this.http.delete<ServiceData>(
        this.url + 'Client/deleteClient',
        httpOptions
      );
    } else {
      return null;
    }
  }
  ///*********************************************************Employee CRUD*****************************************************************
  readEmployee(): Observable<ServiceData[]> {
    return this.http.get<ServiceData[]>(this.url + 'Employee/getEmployee');
  }
  createEmployee(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'Employee/addEmployee',
        formData
      );} }
  updateEmployee(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<ServiceData>(
        this.url + 'Employee/updateEmployee',
        formData
      ); }}
  employeeServiceType(): Observable<ServiceData[]>{
      return this.http.get<ServiceData[]>(
        this.url + 'Employee/updateEmployee'
      );
  }
  updateEmployeeST(formData: ServiceData){
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<ServiceData>(
        this.url + 'Employee/updateEST', 
        formData
      );
    }
  }
  deleteEmployee(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      };
      return this.http.delete<ServiceData>(
        this.url + 'Employee/deleteEmployee',
        httpOptions
      );
    } else {
      return null;
    }
  }

  ///**************************************************************User*********************************************************************
  forgotPassword(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<ServiceData[]>(
        this.url + 'User/ForgotPassword',
        formData
      );
    }
  }
  //use this one refiloe
  FORGOTPASSWORD(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<ServiceData>(this.url + 'User/ForgotPassword', formData);
    }
  }
  Login(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post(this.url + 'User/Login', formData);
    }
  }  
  userSetup(formData: ServiceData){
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'User/userSetup', this.formData
      )
    }
  }
  RegisterEA(formData: ServiceData){ 
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'api/User/RegisterEmployee', formData
      );
    }
  }
  ///********************************************************Availability*********************************************************************
  getTime(): Observable<ServiceData[]> {
    return this.http.get<ServiceData[]>(this.url + 'Employee/getTime');
  }
  getDate(): Observable<ServiceData[]> {
    return this.http.get<ServiceData[]>(this.url + 'Employee/getDate');
  }
  createSchedule(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'Employee/createSchedule',
        formData
      );
    }
  }
  updateSchedule(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'Employee/updateSchedule',
        formData
      );
    }
  }
  //***********************************************************Service Package ************************************************************

  getPackage(): Observable<ServiceData[]> {
    return this.http.get<ServiceData[]>(this.url + 'User/getServicePackage');
  }

  activateSerPackage(formData: ServiceData){
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'User/activeSP', formData
      )
    }
  }
  ///********************************************************Payments*********************************************************************
  salePayment(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(this.url + 'User/salePayment', formData);
    }
  }
  bookingPayment(formData: ServiceData) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<ServiceData>(
        this.url + 'User/bookingPayment',
        formData
      );
    }
  }
    ///********************************************************Payments Types**************************************************************
    getPaymentType(): Observable<ServiceData[]>{
      return this.http.get<ServiceData[]>(this.url + 'User/getPaymentType')
    }
}
