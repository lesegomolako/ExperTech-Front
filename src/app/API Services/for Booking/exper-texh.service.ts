import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import{Client, User, BasketLine,ClientPackage, Product, Booking} from './client';
//import 'rxjs/add/operator/map';
import { HttpHeaders, HttpParams } from '@angular/common/http';  
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ExperTexhService {

  url = 'https://localhost:44380/api/'; 

  RoleID = sessionStorage.getItem("RoleID"); 
  SessionID = sessionStorage.getItem("accessToken");

  UserData: User;
  clientData: Client;
  badgeCount;

  constructor(private http:HttpClient) { }

  logout()
  {
    const params = new HttpParams().set("SessionID", this.SessionID)
    return this.http.get(this.url + 'User/Logout', {params})
  }

  checkHasPackage(ServiceID, ClientID)
  {
    const formData: FormData = new FormData();
    formData.append('ServiceID', ServiceID)
    formData.append('SessionID', this.SessionID)
    formData.append('ClientID', ClientID)
    //const params = new HttpParams().set("SessionID", this.SessionID).set("ServiceID", ServiceID).set("ClientID")
    return this.http.post(this.url + "Booking/CheckHasPackage", formData)
  }

  SubmitBasket()
  {
    const params = new HttpParams().set("SessionID", this.SessionID)
    return this.http.get(this.url + "Sale/AddMakeSale", {params})
  }

  AdviseBooking(Booking)
  {
    return this.http.post(this.url + "Booking/AdviseBooking", Booking)
  }

  getBadgeCount()
  {
    const params = new HttpParams().set("SessionID", this.SessionID)
    return this.http.get<number>(this.url+"Clients/getBadge", {params})
    .subscribe(res => {this.badgeCount = res})
  }


  RegisterClient(formData): Observable<User> {  
    return this.http.post<User>(this.url + 'Clients/registerUser',  
    formData);  

  }

  getProfile(): Observable<User> { 
    const params = new HttpParams().set("SessionID", this.SessionID)
    return this.http.get<User>(this.url + 'User/getProfile', {params})
  }  

  getClientById(cleintId: any): Observable<Client> {  
    return this.http.get<Client>(this.url + 'getALLClientsWithUser/' + cleintId);  
  }  

  updateClient(user){  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + 'User/updateProfile',  
    user);  
  } 
  ViewProduct(Id:Product): Observable<Product[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<Product[]>(this.url + 'Clients/getALLProductsWithPhoto/');  
  } 

  Addproduct(BasketProduct:BasketLine): Observable<any> {  
    return this.http.request('post',this.url + 'Clients/addtBasketline/',{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'SessionID':this.SessionID,},
        body:BasketProduct
    });  
  }

  Updateproduct(BasketProduct:BasketLine): Observable<any> {  
    return this.http.request('post',this.url + 'Clients/Updatebasketline',{
      headers:{ 'Content-Type': 'application/json'},
        body:BasketProduct, params:{"SessionID": this.SessionID}
    });  
  }
  
  
  ViewBasket(SessionID:string): Observable<BasketLine[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<BasketLine[]>(this.url + 'Clients/getBasketlinewithProduct',{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'SessionID':SessionID
      }});  
  } 

  RemoveProduct(BasketID:number,ProductID:number): Observable<any> {  
    return this.http.request('delete',this.url +'Clients/DeleteClientBasket',{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'BasketID':BasketID.toString(),
        'ProductID':ProductID.toString(),
        'SessionID': this.SessionID
      }
    });  
  }  

 

  ViewServicePackage(): Observable<ClientPackage[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<ClientPackage[]>(this.url + 'Clients/getClientPackage/');  
  }

  Requestbookingdetails(form: Booking) 
  {  
    const params = new HttpParams().set("SessionID", this.SessionID);  
    return this.http.post(this.url + 'Bookings/RequestBooking',  form, {params});  
  }

  Makebooking(form: any) 
  {  
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + 'Bookings/MakeBooking',  form);  
  }
  
  ViewClientBooking(SessionID): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<Booking>(this.url + 'Bookings/ViewClientBooking' ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'SessionID':SessionID,

      }
    });   
  } 

  ViewBookings(SessionID): Observable<Booking[]> {  
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<Booking[]>(this.url + 'Bookings/ViewBookings' ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'SessionID':SessionID,
      }
    });   
  } 


  ConfirmBooking(BookingID:Booking): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<Booking>(this.url + 'api/Booking/ConfirmClientBookings' ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'id':BookingID.toString(),

      }
    });   
  }

  RejectBooking(BookingID){  
    const params = new HttpParams().set("bookingID", BookingID).set("SessionID", this.SessionID);  
    return this.http.delete(this.url + 'Clients/DeleteClientBooking',{params});    
  }

  AcceptBooking(BookingID) {  
    const params = new HttpParams().set("bookingID", BookingID).set("SessionID", this.SessionID);  
    return this.http.get(this.url + 'Clients/AcceptClientsBooking',{params});   
  }

  CancelBooking(BookingID)
  {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete(this.url + 'Clients/CancelClientBooking' ,
    {
      params:{
        'bookingID': BookingID,
        'SessionID': this.SessionID,
      }
    });   
  }

  
  
  
  }

