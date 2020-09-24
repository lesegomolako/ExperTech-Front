import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import {FormControl, FormGroupDirective, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService,
    private api: ExperTexhService
  ) { }

  List: Observable<Process[]>;
  editcompanyForm: FormGroup;
  submitted = false;
  public EditcompanyFormGroup: FormGroup;
  editObject = this.service.formData;

  ngOnInit(): void {
    if(this.api.RoleID == "2"){
      
      this.editcompanyForm = this.formBuilder.group({
        Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        Address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        ContactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      })
    }
  }

  loadList() {
    this.List = this.service.readCompany();
    this.editObject = this.service.formData;
  }

  previousForm() {
    window.history.back();
  }

  UpdateCompany(form: NgForm) {
    this.service.updateCompany(form.value).subscribe((ref) => {
      this.loadList();
    });
  }
 

}
