import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceTypeData } from '../../API Services/for Service/services';
import { NgForm } from '@angular/forms';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-st',
  templateUrl: './edit-st.component.html',
  styleUrls: ['./edit-st.component.css']
})
export class EditSTComponent implements OnInit {

  constructor(public service: ServicesService, private router: Router, private api: ExperTexhService, private snack: MatSnackBar) { }

  title: string;


  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.service.TypeData = JSON.parse(localStorage.getItem('stEdit'))
      if (this.service.TypeData == null) {
        this.title = "Add Service Type"
        this.resetForm();
      }
      else {
        this.title = "Edit Service Type"
      }
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }


  }

  onSubmit(form: NgForm) {

    if (form.value.TypeID == null) {
      this.AddType(form)
    }
    else
      this.UpdateType(form)
  }

  AddType(form: NgForm) {
    this.service.AddServiceType(form.value, this.api.SessionID).subscribe(res => {
      if (res == "success") {
        this.snack.open("Service type successfully added", "OK", {duration:3000})
        this.router.navigateByUrl("services/ServiceTypes")
      }
      else if (res == "duplicate") {
        alert("Service Type already exists")
        this.service.TypeData = form.value;
        this.router.navigateByUrl("services/ServiceTypes")
      }
      else {
        console.log(res);
        return;
      }
    }, error => {this.snack.open("Something went wrong. Please try again later", "OK", {duration: 3000})})
  }

  UpdateType(form: NgForm) {
    if (form.untouched)
      confirm("Information has not been changed. Would you like to re-enter details?");
    else {
      this.service.UpdateServiceType(form.value, this.api.SessionID).subscribe(res => {
        if (res == "success") {
          this.snack.open("Service type successfully updated", "OK", {duration:3000});
          this.router.navigateByUrl("services/ServiceTypes")
        }
      }, error => {this.snack.open("Something went wrong. Please try again later", "OK", {duration:3000})})
    }
  }

  Cancel() {
    localStorage.removeItem("stEdit");
    window.history.back();
  }



  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();


    this.service.TypeData =
    {
      TypeID: null,
      Name: null,
      Services: null
    }
  }
}
