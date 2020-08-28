import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.css']
})
export class DeleteServiceComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router) { }

  ngOnInit(): void {
  }

  formData = this.service.ServicesData;

  Delete()
  {
    var ID = this.formData.ServiceID;
    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteService(ID).subscribe(res =>
        {
          if(res == "success")
          {
            alert("Successfully deleted");
            this.router.navigateByUrl("/service/Services");
          }
          else
          {
            alert("Error deleting service. Redirecting to Serivces screen");
            this.router.navigateByUrl("/service/Services");
          }
        })
      
    }
    
  }
}
