import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    confirm("Successfully deleted")
  }

  ngOnInit(): void {
  }

}
