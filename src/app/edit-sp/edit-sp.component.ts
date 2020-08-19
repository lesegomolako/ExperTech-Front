import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-sp',
  templateUrl: './edit-sp.component.html',
  styleUrls: ['./edit-sp.component.css']
})
export class EditSPComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Save()
  {
    //alert("Successfully saved")
    confirm("Service Package already exists/ Would you like to view the package?")
    //confirm("Service Type already exists. Would you like to update instead?")
    //confirm("Information has not been changed. Would you like to re-enter details?");
    //alert("Successfully updated");
  }
}
