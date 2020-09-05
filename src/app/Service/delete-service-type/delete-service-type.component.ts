import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-service-type',
  templateUrl: './delete-service-type.component.html',
  styleUrls: ['./delete-service-type.component.css']
})
export class DeleteServiceTypeComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router) { }

  ngOnInit(): void 
  {
    this.formData = JSON.parse(localStorage.getItem('stDelete'))
    if (!this.formData)
    {
      alert("Invalid details. Redirecting to Service Types screen")
      this.router.navigateByUrl("services/ServiceTypes")
    }
    
  }

  formData;
  
  Cancel()
  {   
    localStorage.removeItem("stDelete")
    window.history.back();
  }

  Delete()
  {
    var ID = this.formData.TypeID
    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteServiceType(ID).subscribe(res =>
        {
          if (res == "success")
          {
            localStorage.removeItem("stDelete")
            alert("Successfully deleted");
            this.router.navigateByUrl("services/ServiceTypes");
          }
          else
          {
            localStorage.removeItem("stDelete")
            alert("Error deleting Service Type. Redirecting to Service Type screen");
            this.router.navigateByUrl("services/ServiceTypes");
          }

        })
    }
    
  }

  
}
