import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-service-type',
  templateUrl: './delete-service-type.component.html',
  styleUrls: ['./delete-service-type.component.css']
})
export class DeleteServiceTypeComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private api:ExperTexhService, private snack: MatSnackBar) { }

  ngOnInit(): void 
  {
    if(this.api.RoleID == "2")
    {
      this.formData = JSON.parse(localStorage.getItem('stDelete'))
      if (!this.formData)
      {
        alert("Invalid details. Redirecting to Service Types screen")
        this.router.navigateByUrl("services/ServiceTypes")
      }
    }
    else
    {
      this.router.navigate(["403Forbidden"])
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
      this.service.DeleteServiceType(ID, this.api.SessionID).subscribe((res:any) =>
        {
          if (res == "success")
          {
            localStorage.removeItem("stDelete")
            this.snack.open("Service type successfully deleted", "OK", {duration:3000});
            this.router.navigateByUrl("services/ServiceTypes");
          }
          else if(res.Error == "dependencies")
          {
            alert(res.Message)
          }
          else
          {
            localStorage.removeItem("stDelete")
            alert("Error deleting Service Type");
            console.log(res)
            this.router.navigateByUrl("services/ServiceTypes");
          }

        })
    }
    
  }

  
}
