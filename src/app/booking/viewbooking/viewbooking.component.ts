import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.sass']
})
export class ViewbookingComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    confirm("Successfully cancelled")
  }

  ngOnInit(): void {
  }

}
