import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-so',
  templateUrl: './delete-so.component.html',
  styleUrls: ['./delete-so.component.css']
})
export class DeleteSOComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.formData = JSON.parse(localStorage.getItem('soDelete'))
    if(!this.formData)
    {
      this.router.navigateByUrl('services/ServiceOptions')
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
      this.service.DeleteServiceOption(OptionID).subscribe(res =>
        {
          if(res = "success")
          {
            localStorage.removeItem('soDelete')
            alert("Sucessfully deleted");
            this.router.navigateByUrl("services/ServiceOptions");
          }

        })
    }
    
  }
}
