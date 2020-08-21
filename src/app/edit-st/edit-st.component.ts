import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../services.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceTypeData} from '../services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-st',
  templateUrl: './edit-st.component.html',
  styleUrls: ['./edit-st.component.css']
})
export class EditSTComponent implements OnInit {

  constructor(public service: ServicesService, private router: Router) { }

  title: string;
  

  ngOnInit(): void {
    

    if (this.service.TypeData == null)
    {
        this.title = "Add Service Type"
        this.resetForm();
    }
    else
    {
        this.title = "Edit Service Type"
    }

    
  }

 Save()
 {
   //alert("Successfully saved")
   //confirm("Service Type already exists. Would you like to update instead?")
   //confirm("Information has not been changed. Would you like to re-enter details?");
   
 }

 onSubmit(form: NgForm)
{
    
    if (form.value.TypeID == null)
    {
      this.AddType(form)
    }
    else
    this.UpdateType(form)
}

AddType(form: NgForm)
{
   this.service.AddServiceType(form.value).subscribe(res => 
    {
      if(res == "success")
      {
        alert("Successfully saved")
        this.router.navigateByUrl("services/ServiceTypes")
      }
      else if(res == "duplicate")
      {
        if (confirm("Service Type already exists. Would you like to update instead?"))
        {
          this.service.TypeData = form.value;
          window.location.reload();
        }
        else
        {
          this.router.navigateByUrl("services/ServiceTypes")
        }
      }
      else
      {
        return res
      }
    })
}

UpdateType(form: NgForm)
{
  if(form.value == this.service.TypeData)
    confirm("Information has not been changed. Would you like to re-enter details?");
  else
  {
   this.service.UpdateServiceType(form.value).subscribe(res =>
    {
      if(res == "success")
      {
        alert("Successfully updated");
        this.router.navigateByUrl("services/ServiceTypes")
      }
    })
  }
}

Cancel()
{
  window.history.back();
}

 resetForm(form?: NgForm)
{
    if (form != null)
    form.reset();

    
    this.service.TypeData = 
    {
      TypeID : null,
      Name : null,
      Description : null,}
    }
}
