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
import { ServicesService } from '../services.service';
import { ServiceData } from '../services';


@Component({
  selector: 'app-spackage',
  templateUrl: './spackage.component.html',
  styleUrls: ['./spackage.component.css']
})
export class SpackageComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    public service: ServicesService
  ) { }

  loadList(){
    this.List = this.service.getPackage();
  }
  
  List: Observable<ServiceData[]>
  ngOnInit(): void {
    this.loadList();
  }
}
