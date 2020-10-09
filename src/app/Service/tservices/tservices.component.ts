import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceData} from '../../API Services/for Service/services';

@Component({
  selector: 'app-tservices',
  templateUrl: './tservices.component.html',
  styleUrls: ['./tservices.component.css']
})
export class TServicesComponent implements OnInit {

  constructor(public service: ServicesService, private rouuter: Router) { }
 
  ServicesList : Observable<ServiceData[]>;

  ngOnInit() 
  {
    this.loadList();
    localStorage.clear();
  }

  loadList()
  {
    this.ServicesList = this.service.getServices();
    
  }

  closeModal()
  {
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
  }

  ViewImage(data: ServiceData)
  {
    // Get the modal
    var modal = document.getElementById("myModal");
          
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = <HTMLImageElement>document.getElementById("img01");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = data.Image
    captionText.innerHTML = data.Name
    
    
    
    
  }

  EditService(form: ServiceData)
  {
    //this.service.ServicesData = form;
    localStorage.setItem("sEdit", JSON.stringify(form))
    this.rouuter.navigateByUrl("/services/EditService")
  }

  AddService()
  {
    //this.service.ServicesData = null;
    localStorage.removeItem("sEdit")
    this.rouuter.navigateByUrl("/services/EditService")
  }

  DeleteService(form: ServiceData)
  {
    //this.service.ServicesData = form;
    localStorage.setItem("sDelete", JSON.stringify(form))
    this.rouuter.navigateByUrl("/services/DeleteService")
  }

  
}
