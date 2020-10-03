import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/API Services/for Service/services.service';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.css']
})
export class DeleteServiceComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private api: ExperTexhService) { }

  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {
      this.formData = JSON.parse(localStorage.getItem('sDelete'))
      if(!this.formData)
      {
        this.router.navigateByUrl("services/Services")      
      }
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  Cancel()
{
  localStorage.removeItem('sDelete');
  window.history.back();
}

  formData;

  Delete()
  {
    var ID = this.formData.ServiceID;
    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteService(ID, this.api.SessionID).subscribe(res =>
        {
          if(res == "success")
          {
            localStorage.removeItem('sDelete');
            alert("Successfully deleted");
            this.router.navigateByUrl("/services/Services");
          }
          else
          {
            localStorage.removeItem('sDelete');
            alert("Error deleting service. Redirecting to Serivces screen");
            this.router.navigateByUrl("/services/Services");
          }
        })
      
    }
    
  }
}
