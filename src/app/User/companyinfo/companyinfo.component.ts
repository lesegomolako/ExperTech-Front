import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-companyinfo',
  templateUrl: './companyinfo.component.html',
  styleUrls: ['./companyinfo.component.sass']
})
export class CompanyinfoComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    public service: ReportingService
  ) { }

  List: Observable<Process[]>;

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.List = this.service.readCompany();
  }

  DeleteCompany(form: Process){
    this.service.deleteCompany(form).subscribe(ref => {this.loadList()});
  }

  UpdateCompany(form: NgForm){
    this.service.updateCompany(form.value).subscribe(ref => {this.loadList()});
  }
}
