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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  public FpasswordFormGroup: FormGroup;
  constructor(
    public dialog: MatDialog,
    private formBoilder: FormBuilder,
    public service: ReportingService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBoilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  //convenienve getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  onSubmit() {
    //stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
  }
  List: Observable<Process[]>
}
