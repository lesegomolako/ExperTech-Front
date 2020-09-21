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

  url = 'https://localhost:44380/api/'; 

  RoleID = sessionStorage.getItem("RoleID"); 
  SessionID = sessionStorage.getItem("accessToken");

  UserData: User;
  clientData: Client;
  badgeCount;

  constructor(private http:HttpClient) { }

  AdviseBooking(Booking)
  {
    console.log(Booking)
    return this.http.post(this.url + "Booking/AdviseBooking", Booking)
  }

  getBadgeCount()
  {
    return this.http.get<number>(this.url+"Clients/getBadge?SessionID="+this.SessionID)
    .subscribe(res => {this.badgeCount = res})
  }


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
    return this.http.put<Client>(this.url + 'Clients/UpdateClient/',  
    client, httpOptions);  
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
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + 'Bookings/RequestBooking',  form);  
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

  
  
  
  }

