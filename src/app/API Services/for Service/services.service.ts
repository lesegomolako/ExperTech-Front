import { Injectable } from '@angular/core';
import{ServiceTypeData, ServiceData, ServiceOptionData, PackageData} from '../for Service/services'
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
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
    
    return this.http.post(this.url + "Services/UpdateServiceType" , form)
  }

  AddServiceType(form: ServiceTypeData)
  {
    return this.http.post(this.url + 'Services/AddServiceType' , form)
  }

  DeleteServiceType(TypeID: any)
  {    
    const params = new HttpParams().set('TypeID', TypeID );
    return this.http.delete(this.url + 'Services/DeleteServiceType', {
      headers: {'Content-Type': 'application/json'},
      params: params
    })
  }

  //*********************Service **************/
  ServicesData: ServiceData = null;
  

  getServices(): Observable<ServiceData[]>
  {
    return this.http.get<ServiceData[]>(this.url+"Services/GetService")
  }

  UpdateService(form: ServiceData)
  {
    
    return this.http.post(this.url + "Services/UpdateService" , form)
  }

  AddService(form: ServiceTypeData)
  {
    return this.http.post(this.url + 'Services/AddService' , form)
  }

  DeleteService(ServiceID: any)
  {    
    const params = new HttpParams().set('ServiceID', ServiceID );
    return this.http.delete(this.url + 'Services/DeleteService',
     {
      headers: {'Content-Type': 'application/json'},
      params: params})
  }

  //************************Service Option *******************/
  OptionData: ServiceOptionData = null;

  getServiceOptions(): Observable<ServiceOptionData[]>
  {
    return this.http.get<ServiceOptionData[]>(this.url+"Services/GetServiceOption")
  }

  UpdateServiceOption(form: ServiceOptionData)
  {
    
    return this.http.put(this.url + "Services/UpdateServiceOption" , form)
  }

  AddServiceOption(form: ServiceOptionData)
  {
 
    return this.http.post(this.url + 'Services/AddServiceOption' , form)
  }

  DeleteServiceOption(OptionID: any)
  {    
    const params = new HttpParams().set('OptionID', OptionID );
    return this.http.delete(this.url + 'Services/DeleteServiceOption', {
      headers: {'Content-Type': 'application/json'},
      params: params})
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

  DeleteServicePackage(PackageID: any)
  {    
    const params = new HttpParams().set('PackageID', PackageID );
    return this.http.delete(this.url + 'Services/RemoveServicePackage', {
      headers: {'Content-Type': 'application/json'},
      params: params})
  }

  AddServicePhoto(ServiceID: any, UploadFile:File )
  {
    const formData: FormData = new FormData();
    formData.append('ServiceID', ServiceID)
    formData.append('Image', UploadFile, UploadFile.name)
    console.log(formData)
    console.log(UploadFile)
    return this.http.post(this.url+'Services/AddServicePhoto', formData )
  }

  
}
