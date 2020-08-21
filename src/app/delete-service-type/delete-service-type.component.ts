import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-delete-service-type',
  templateUrl: './delete-service-type.component.html',
  styleUrls: ['./delete-service-type.component.css']
})
export class DeleteServiceTypeComponent implements OnInit {

  constructor(private service: ServicesService) { }

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
            alert("Successfully deleted")
          }
          else
          {
            alert("Error deleting Service Type. Redirecting to Service Type screen")
          }

        })
    }
    
  }

  
}
