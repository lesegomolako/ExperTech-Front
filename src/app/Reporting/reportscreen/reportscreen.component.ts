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
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportscreen',
  templateUrl: './reportscreen.component.html',
  styleUrls: ['./reportscreen.component.css']
})
export class ReportscreenComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    public service: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
