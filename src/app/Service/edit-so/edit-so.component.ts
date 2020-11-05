import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-so',
  templateUrl: './edit-so.component.html',
  styleUrls: ['./edit-so.component.css']
})
export class EditSOComponent implements OnInit {

  constructor(public service: ServicesService, private router: Router, private api: ExperTexhService, private snack: MatSnackBar) { }

  title: string;


  ngOnInit(): void {

    if (this.api.RoleID == "2") {
      this.service.OptionData = JSON.parse(localStorage.getItem('soEdit'))
      if (this.service.OptionData == null) {
        this.title = "Add Service Option"
        this.resetForm();
      }
      else {
        this.title = "Edit Service Option"
      }
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }



  Save() {
    //alert("Successfully saved")
    //confirm("Service Option already exists. Would you like to update instead?")
    //confirm("Information has not been changed. Would you like to re-enter details?");

  }

  onSubmit(form: NgForm) {
    if (form.value.OptionID == null) {
      this.AddOption(form)
    }
    else
      this.UpdateOption(form)
  }

  AddOption(form: NgForm) {
    this.service.AddServiceOption(form.value, this.api.SessionID).subscribe(res => {
      if (res == "success") {
        this.snack.open("Service option successfully added", "OK", {duration:3000})
        this.router.navigateByUrl("services/ServiceOptions")
      }
      else if (res == "duplicate") {
        if (confirm("Service Option already exists. Would you like to update instead?")) {
          this.service.OptionData = form.value;
          window.location.reload();
        }
        else {
          this.router.navigateByUrl("services/ServiceOptions")
        }
      }
      else {
        console.log(res);
        return;
      }
    })
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  UpdateOption(form: NgForm) {
    if (form.untouched)
      confirm("Information has not been changed. Would you like to re-enter details?");
    else {
      this.service.UpdateServiceOption(form.value, this.api.SessionID).subscribe(res => {
        if (res == "success") {
          this.snack.open("Service option successfully updated", "OK", {duration:3000});
          this.router.navigateByUrl("services/ServiceOptions")
        }
      })
    }
  }

  Cancel() {
    window.history.back();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();


    this.service.OptionData =
    {
      OptionID: null,
      Name: null,
      Duration: null,
    }
  }
}
