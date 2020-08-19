import { Injectable } from '@angular/core';
import{ServiceTypeData, ServiceData, ServiceOptionData} from './services'
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
    
    return this.http.post(this.url + "Services/AddItems" , form)
  }

  AddServiceType(form: ServiceTypeData)
  {
 
    return this.http.post(this.url + 'Services/UpdateServiceType' , form)
  }

  DeleteServiceType(TypeID: any)
  {    
    return this.http.delete(this.url + 'Services/DeleteServiceType' , TypeID)
  }

  //************************Service Option *******************/
  OptionData: ServiceOptionData = null;

  getServiceOptions(): Observable<ServiceOptionData[]>
  {
    return this.http.get<ServiceOptionData[]>(this.url+"Services/GetServiceOption")
  }

  UpdateServiceOption(form: ServiceData)
  {
    
    return this.http.post(this.url + "Services/UpdateServiceOption" , form)
  }

  AddServiceOption(form: ServiceTypeData)
  {
 
    return this.http.post(this.url + 'Services/AddServiceOption' , form)
  }

  DeleteServiceOption(TypeID: any)
  {    
    return this.http.delete(this.url + 'Services/DeleteServiceOption' , TypeID)
  }
}
