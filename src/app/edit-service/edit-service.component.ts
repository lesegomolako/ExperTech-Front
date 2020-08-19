import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Save()
  {
    //alert("Successfully saved")
    //confirm("Service already exists. Would you like to update instead?")
    //confirm("Information has not been changed. Would you like to re-enter details?");
    //alert("Successfully updated");
  }
}
