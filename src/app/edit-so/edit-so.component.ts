import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-so',
  templateUrl: './edit-so.component.html',
  styleUrls: ['./edit-so.component.css']
})
export class EditSOComponent implements OnInit {

  constructor(public service: ServicesService, private router: Router) { }

  title: string;
  

  ngOnInit(): void {

    if (this.service.OptionData == null)
    {
        this.title = "Add Service Option"
    }
    else
    {
        this.title = "Edit Service Option"
    }
  }

 Save()
 {
   //alert("Successfully saved")
   //confirm("Service Option already exists. Would you like to update instead?")
   //confirm("Information has not been changed. Would you like to re-enter details?");
   
 }

 onSubmit(form: NgForm)
{
    if (form.value.OptionID == null)
    {
      this.AddOption(form)
    }
    else
    this.UpdateOption(form)
}

AddOption(form: NgForm)
{
   this.service.AddServiceOption(form.value).subscribe(res => 
    {
      if(res == "success")
      {
        alert("Successfully saved")
        this.router.navigateByUrl("services/ServiceOptions")
      }
      else if(res == "duplicate")
      {
        if (confirm("Service Option already exists. Would you like to update instead?"))
        {
          this.service.OptionData = form.value;
          window.location.reload();
        }
        else
        {
          this.router.navigateByUrl("services/ServiceOptions")
        }
      }
      else
      {
        return res
      }
    })
}

UpdateOption(form: NgForm)
{
  if(form.value == this.service.OptionData)
    confirm("Information has not been changed. Would you like to re-enter details?");
  else
  {
   this.service.UpdateServiceOption(form.value).subscribe(res =>
    {
      if(res == "success")
      {
        alert("Successfully updated");
        this.router.navigateByUrl("services/ServiceOptions")
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

    
    this.service.OptionData = 
    {
      OptionID : null,
      Name : "",
      Duration : null,}
    }
}
