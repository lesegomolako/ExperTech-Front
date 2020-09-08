import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import{Client, User, BasketLine,ClientPackage, Product, Booking} from './client';
//import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';  
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ExperTexhService {

  url = 'https://localhost:44375/api/';  
  UserData: User;
  clientData: Client;
  badgeCount = 0;
  

  constructor(private http:HttpClient) { }

  RegisterClient(formData: User): Observable<User> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<User>(this.url + 'Clients/registerUser',  
    formData);  

  }

  getClientdetails(Id: any): Observable<Client> {  
    return this.http.get<Client>(this.url + 'Clients/getallClients?id=1');  
  }  

  getClientById(cleintId: any): Observable<Client> {  
    return this.http.get<Client>(this.url + 'getALLClientsWithUser/' + cleintId);  
  }  

  updateClient(client:Client): Observable<Client> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Client>(this.url + 'Client/UpdateClient/',  
    client, httpOptions);  
  } 
  ViewProduct(Id:Product): Observable<Product[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<Product[]>(this.url + 'Client/getALLProductsWithPhoto/');  
  } 

  Addproduct(BasketID:string,BasketProduct:BasketLine): Observable<any> {  
    return this.http.request('post',this.url + 'Client/addtBasketline/',{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'BasketID':BasketID,},
        body:BasketProduct
    });  
  }

  Updateproduct(BasketProduct:BasketLine): Observable<any> {  
    return this.http.request('post',this.url + 'Client/Updatebasketline/',{
      headers:{ 'Content-Type': 'application/json'},
        body:BasketProduct
    });  
  }
  
  
  ViewBasket(Id:BasketLine): Observable<BasketLine[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<BasketLine[]>(this.url + 'Client/getBasketlinewithProduct/');  
  } 

  RemoveProduct(BasketID:number,ProductID:number): Observable<any> {  
    return this.http.request('delete',this.url +'Client/DeleteClientBasket/',{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'BasketID':BasketID.toString(),
        'ProductID':ProductID.toString()
      }
    });  
  }  

 

  ViewServicePackage(): Observable<ClientPackage[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<ClientPackage[]>(this.url + 'Client/getClientPackage/');  
  }

  Requestbookingdetails(form: Booking) 
  {  
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + 'Bookings/RequestBooking',  form);  
  }
  
  ViewClientBooking(BookingID:Booking): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<Booking>(this.url + 'Bookings/ViewClientBooking' ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'ClientID':BookingID.toString(),

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

  RejectBooking(BookingID:Booking): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<Booking>(this.url + 'Clients/DeleteClientBooking' ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'id':BookingID.toString(),

      }
    });   
  }

  AcceptBooking(BookingID:Booking) {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + 'Clients/AcceptClientsBooking?bookingID=' + BookingID ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'bookingID':BookingID.toString(),

      }
    });   
  }
  CancelBooking(BookingID:Booking): Observable<Booking> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<Booking>(this.url + 'Clients/CancelClientBooking?id='+ BookingID ,{
      headers:{ 'Content-Type': 'application/json'},
      params:{
        'bookingID':BookingID.toString(),

      }
    });   
  }

  getBasketQuantity(Id: any): Observable<BasketLine> {  
    return this.http.get<BasketLine>(this.url + 'Clients/getbasketQuantity?id=4');  
  }

  
  
  
  }

