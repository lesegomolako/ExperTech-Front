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

  ngOnInit(): void {
  }

  formData = this.service.TypeData;
  

  Delete()
  {
    var ID = this.formData.TypeID
    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteServiceType(ID).subscribe(res =>
        {
          if (res == "success")
          {
            alert("Successfully deleted");
            this.router.navigateByUrl("service/ServiceTypes");
          }
          else
          {
            alert("Error deleting Service Type. Redirecting to Service Type screen");
            this.router.navigateByUrl("service/ServiceTypes");
          }

        })
    }
    
  }

  
}
