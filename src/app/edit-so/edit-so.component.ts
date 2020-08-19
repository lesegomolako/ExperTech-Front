import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-so',
  templateUrl: './edit-so.component.html',
  styleUrls: ['./edit-so.component.css']
})
export class EditSOComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Save()
  {
    //alert("Successfully saved")
    //confirm("Service Option already exists. Would you like to update instead?")
    //confirm("Information has not been changed. Would you like to re-enter details?");
    //alert("Successfully updated");
  }
}
