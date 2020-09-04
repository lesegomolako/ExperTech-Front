import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { ServiceData } from '../services';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
})
export class SetupComponent implements OnInit {
  setupForm: FormGroup;
  submitted = false;
  public SetupFormGroup: FormGroup;
  user: ServiceData[];
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    public service: ServicesService
  ) {}

  ngOnInit() {
    this.setupForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(2)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.setupForm.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.SetupFormGroup.controls[controlName].hasError(errorName);
  };
  onReset() {
    this.submitted = false;
    this.setupForm.reset();
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
}
