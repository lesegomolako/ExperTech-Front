import { Component, OnInit } from '@angular/core';
//import { Process } from '../process';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-fpassword',
  templateUrl: './fpassword.component.html',
  styleUrls: ['./fpassword.component.sass'],
})
export class FpasswordComponent implements OnInit {
  fpasswordForm: FormGroup;
  submitted = false;
  public FpasswordFormGroup: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBoilder: FormBuilder,
    public service: ReportingService
  ) {}

  ngOnInit(): void {
    this.fpasswordForm = this.formBoilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  //convenienve getter for easy access to form fields
  get f() {
    return this.fpasswordForm.controls;
  }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  onSubmit() {
    //stop here if form is invalid
    if (this.fpasswordForm.invalid) {
      return;
    }
  }
  List: Observable<Process[]>
}
