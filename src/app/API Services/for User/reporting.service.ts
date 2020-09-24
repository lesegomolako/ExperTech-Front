import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { fromEvent, Observable } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Process, Schedule, Package } from './process';
import { User } from 'src/app/Staff/admin-register/admin-register.component';
import { AvailData } from 'src/app/User/available/available.component';
import { UserData } from 'src/app/Staff/setup/setup.component';

//import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  formData: Process;
  List: Process[];
  url = 'https://localhost:44380/api/';
  user: any;

  constructor(private http: HttpClient) {}
  
  
  ///********************************************************Admin CRUD*********************************************************************
  readAdmin(): Observable<Process[]> {
    return this.http.get<Process[]>(this.url + 'Admin/getAdmin');
  }
  createAdmin(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(this.url + 'Admin/addAdmin', formData);
    }
  }
  updateAdmin(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(this.url + 'Admin/updateAdmin', formData);
    }
  }
  deleteAdmin(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      };
      return this.http.delete<Process>(
        this.url + 'Admin/deleteAdmin',
        httpOptions
      );
    } else {
      return null;
    }
  }
  ///********************************************************Client CRUD*********************************************************************
  readClient(): Observable<Process[]>{
    return this.http.get<Process[]>(this.url + 'Clients/getClient');
    }
  walkinClient(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'Admin/walkInClient',
        formData
      );
    }
  }

  updateClient(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<Process>(this.url + 'Clients/updateClient', formData);
    }
  } 
  deleteClient(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      };
      return this.http.delete<Process>(
        this.url + 'Clients/deleteClient',
        httpOptions
      );
    } else {
      return null;
    }
  }
  ///*********************************************************Employee CRUD*****************************************************************
  readEmployee(): Observable<Process[]> {
    return this.http.get<Process[]>(this.url + 'Employees/getEmployee');
  }
  createEmployee(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'Employees/addEmployee',
        formData
      );} }
  updateEmployee(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<Process>(
        this.url + 'Employees/updateEmployee',
        formData
      ); }}
  employeeServiceType(): Observable<Process[]>{
      return this.http.get<Process[]>(
        this.url + 'Employees/getEmployeeType'
      );
  }
  updateEmployeeST(formData: Process){
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<Process>(
        this.url + 'Employees/updateEST', 
        formData
      );
    }
  }
  deleteEmployee(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      };
      return this.http.delete<Process>(
        this.url + 'Employees/deleteEmployee',
        httpOptions
      );
    } else {
      return null;
    }
  }
  ///***********************************************User**************************************************
  forgotPassword(email) {

    const params = new HttpParams().set('Email', email );

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params,
    };
    
    return this.http.post(this.url + 'User/ForgotPassword', httpOptions);
    
  }
  //use this one refiloe
  FORGOTPASSWORD(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<Process>(this.url + 'User/ForgotPassword', formData);
    }
  }
  Login(formData: Process) {
    
    let body = JSON.stringify(formData);
  
    return this.http.post(this.url + 'User/Login', formData);
    
  }  
  userSetup(formData: UserData){
   
      return this.http.put(
        this.url + 'User/userSetup', formData)
    
  }
  RegisterAdmin(formData: User){ 
    
      return this.http.post<Process>(
        this.url + 'User/RegisterAdmin', formData
      );
    
  }

  RegisterEmployee(formData){ 
    
    return this.http.post(
      this.url + 'User/RegisterEmployee', formData
    );
  
}
  ///***********************************************Availability*********************************************
  getTime(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url + 'Employees/getTime');
  }
  getDate(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url + 'Employees/getDate');
  }
  createSchedule(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'Employees/createSchedule',
        formData
      );
    }
  }
  updateSchedule(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'Employees/updateSchedule',
        formData
      );
    }
  }

  AvailableorNot(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'Employees/createSchedule',
        formData
      );
    }
  }

   //set the schedule
   Schedule(form: AvailData) {
    const formData: FormData = new FormData();
    formData.append("StartDate", form.StartDate)
    formData.append("EndDate", form.EndDate)
    formData.append("EndTime", form.EndTime)
    formData.append("StartTime", form.StartTime)
    formData.append("Availbilness", form.Avail)

    return this.http.post(this.url + 'Employee/EmployeeAvailability', formData);
  }
  //***********************************************Service Package ******************************************

  getPackage(): Observable<Package[]> {
    return this.http.get<Package[]>(this.url + 'Services/RetrieveServicePackage');
  }

  activateSerPackage(formData: Process){
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'User/activeSP', formData
      )
    }
  }
  ///**********************************************Payments**************************************************
  salePayment(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(this.url + 'User/salePayment', formData);
    }
  }
  
  bookingPayment(formData) 
  { 
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),body: formData};
    
    return this.http.post(this.url + "User/bookingPayment", httpOptions);   
  }
    ///********************************************************Payments Types**************************************************************
    getPaymentType(): Observable<any[]>{
      return this.http.get<any[]>(this.url + 'User/getPaymentType');
    }

  GetReportingData(selected) {
    return this.http
      .get(
        this.url + 'Reports/GetReportData?Option=' + selected
      )
      .pipe(map((result) => result));
  }
    //***************************Company Information*********************************** */
    readCompany(): Observable<Process[]> {
      return this.http.get<Process[]>(this.url + 'Admin/getCompany');
    }
    createCompany(formData: Process) {
      let body = JSON.stringify(formData);
      if (confirm(body)) {
        return this.http.post<Process>(this.url + 'Admin/addCompany', formData);
      }
    }
    updateCompany(formData: Process) {
      let body = JSON.stringify(formData);
      if (confirm(body)) {
        return this.http.put<Process>(this.url + 'Admin/updateCompany', formData);
      }
    }
    deleteCompany(formData: Process) {
      let body = JSON.stringify(formData);
      if (confirm(body)) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          body: body,
        };
  
        return this.http.delete<Process>(
          this.url + 'Admin/deleteCompany',
          httpOptions
        );
      } else {
        return null;
      }
    }
}
