import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-so',
  templateUrl: './delete-so.component.html',
  styleUrls: ['./delete-so.component.css']
})
export class DeleteSOComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private api: ExperTexhService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
      this.formData = JSON.parse(localStorage.getItem('soDelete'))
      if(!this.formData)
      {
        this.router.navigateByUrl('services/ServiceOptions')
      }
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
   
  }

  Cancel()
{
  localStorage.removeItem('soDelete')
  window.history.back();
}

  formData;

  Delete(OptionID: any)
  {

    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteServiceOption(OptionID, this.api.SessionID).subscribe((res:any) =>
        {
          if(res == "success")
          {
            localStorage.removeItem('soDelete')
            this.snack.open("Service option sucessfully deleted", "OK", {duration:3000});
            this.router.navigateByUrl("services/ServiceOptions");
          }
          else if(res.Error == "dependencies")
          { 
            alert(res.Message)
            return
          }

        })
    }
    
  }
}
