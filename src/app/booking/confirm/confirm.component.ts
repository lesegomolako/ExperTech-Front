import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Booking} from 'src/app/client';
import { ExperTexhService } from 'src/app/exper-texh.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent implements OnInit {
  id: any;
  booking :  Booking[];
  constructor(private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }
  openDialog() {
    confirm("Successfully deleted")
  }

  ngOnInit(): void {
  }

  confirm(){
    this.api.ConfirmBooking(this.id).subscribe(data=>{
      alert("Booking successfully confirmed")
     });
  }

  deletes(){
    this.api.RejectBooking(this.id).subscribe(data=>{
      alert("Booking successfully deleted")
     });
  }

}
