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
import { Process, Schedule, Package, PaymentType, Sale } from './process';
import { Employee, User } from 'src/app/API Services/for Booking/client';
import { AvailData } from 'src/app/User/available/available.component';
import { UserData } from 'src/app/Staff/setup/setup.component';
import { Admin, Client } from '../for Booking/client';
import { CompanyInfo, SocialMedia, Timeslots } from 'src/app/User/company-settings/company-settings.component';

//import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  formData: Process;
  List: Process[];
  url = 'https://expertechapi.azurewebsites.net/api/';
  user: any;

  constructor(private http: HttpClient) { }


  ///********************************************************Admin CRUD*********************************************************************
  readAdmin(SessionID): Observable<Admin[]> {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.get<Admin[]>(this.url + 'Admin/getAdmin', {params});
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
  deleteAdmin(AdminID, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID).set("AdminID", AdminID)
    return this.http.delete(this.url + 'Admin/deleteAdmin',{params}
    );

  }
  ///********************************************************Client CRUD*********************************************************************
  readClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + 'Clients/getClient');
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

  deleteClient(ClientID, SessionID) {
    
    const params = new HttpParams().set("ClientID",ClientID).set("SessionID", SessionID)
    return this.http.delete<Process>(
        this.url + 'Clients/deleteClient',
        {params}
      );
  
  }
  ///*********************************************************Employee CRUD*****************************************************************
  readEmployee(SessionID): Observable<Employee[]> {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.get<Employee[]>(this.url + 'Employees/getEmployee', {params});
  }
  createEmployee(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(
        this.url + 'Employees/addEmployee',
        formData
      );
    }
  }
  updateEmployee(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<Process>(
        this.url + 'Employees/updateEmployee',
        formData
      );
    }
  }
  employeeServiceType(): Observable<Process[]> {
    return this.http.get<Process[]>(
      this.url + 'Employees/getEmployeeType'
    );
  }
  updateEmployeeST(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.put<Process>(
        this.url + 'Employees/updateEST',
        formData
      );
    }
  }
  deleteEmployee(EmployeeID, SessionID, Sure: boolean) {
    
    const params = new HttpParams().set("EmployeeID", EmployeeID).set("SessionID", SessionID).set("Sure", Sure.toString())
    return this.http.delete(this.url + 'Employees/deleteEmployee',
        {params}
      );
    
  }
  ///***********************************************User**************************************************
  forgotPassword(username) {

    const params = new HttpParams().set('Username', username);

    return this.http.get(this.url + 'User/ForgotPassword', { params });

  }
 
  ChangePassword(Passwords, SessionID)
  {
    const params = new HttpParams().set("SessionID", SessionID);
    return this.http.post(this.url + 'User/ChangePassword', Passwords, {params})
  }



  Login(formData: Process) {

    let body = JSON.stringify(formData);

    return this.http.post(this.url + 'User/Login', formData);

  }
  userSetup(formData: UserData) {

    return this.http.put(
      this.url + 'User/userSetup', formData)

  }
  RegisterAdmin(formData: User) {

    return this.http.post<Process>(
      this.url + 'User/RegisterAdmin', formData
    );

  }

  RegisterEmployee(formData) {

    return this.http.post(
      this.url + 'User/RegisterEmployee', formData
    );
  }
  //******************Admin Booking Tings ******************/

  Authorize(form, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post(this.url + "Admin/Authorize", form, { params })
  }

  NoShow(BookingID, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID).set("BookingID", BookingID)
    return this.http.get(this.url + "Bookings/NoShow", { params })
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

  //**********************Timeslots **********************/

  updateTimes(times, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID);
    return this.http.post(this.url + 'Admin/updateTimes', times, { params });
  }

  GetTimes() {
    const params = new HttpParams();
    return this.http.get<Timeslots[]>(this.url + 'Admin/GetAllTimes')
  }

  //******************Company Info *****************/
  GetCompanyInfo() {
    return this.http.get<CompanyInfo>(this.url + "Admin/GetCompanyInfo")
  }

  updateCompany(formData: CompanyInfo, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID)

    return this.http.put(this.url + 'Admin/updateCompany', formData, { params });

  }

  //***********************Social Media **********************/
  GetSocials() {
    return this.http.get<SocialMedia[]>(this.url + "Admin/GetSocials")
  }

  AddSocials(Socials: SocialMedia, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID);
    return this.http.post(this.url + "Admin/AddSocials", Socials, { params })
  }

  EditSocials(Socials: SocialMedia, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.put(this.url + "Admin/UpdateSocials", Socials, { params })
  }

  DeleteSocials(SocialID, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID).set("SocialID", SocialID);
    return this.http.delete(this.url + "Admin/DeleteSocials", { params })
  }

  //set the schedule
  Schedule(form: AvailData, SessionID) {
    const formData: FormData = new FormData();
    formData.append("StartDate", form.StartDate)
    formData.append("EndDate", form.EndDate)
    formData.append("EndTime", form.EndTimeID)
    formData.append("StartTime", form.StartTimeID)
    formData.append("Availbilness", form.Avail)

    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post(this.url + 'Employee/EmployeeAvailability', form, { params });
  }
  //***********************************************Service Package ******************************************

  getPackage(): Observable<Package[]> {
    return this.http.get<Package[]>(this.url + 'Services/RetrieveServicePackage');
  }

  activateSerPackage(formData, SessionID) {
    const params = new HttpParams().set("SessionID", SessionID)
    return this.http.post(this.url + 'User/activeSP', formData, { params })

  }
  ///**********************************************Payments**************************************************
  salePayment(formData: Process) {
    let body = JSON.stringify(formData);
    if (confirm(body)) {
      return this.http.post<Process>(this.url + 'User/salePayment', formData);
    }
  }

  bookingPayment(formData) {
    return this.http.post(this.url + "User/bookingPayment", formData);
  }
  ///********************************************************Payments Types**************************************************************
  getPaymentType(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(this.url + 'User/getPaymentType');
  }

  restPassword(Password) {
    return this.http.post(this.url + "User/ResetPassword", Password)
  }

  GetReportingData(selected) {
    return this.http
      .get(
        this.url + 'Reports/GetReportData?Option=' + selected
      )
      .pipe(map((result) => result));
  }
  //***************************Company Information*********************************** */



}
