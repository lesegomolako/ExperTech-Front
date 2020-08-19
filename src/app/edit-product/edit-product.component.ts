import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Save()
  {
    //alert("Successfully saved")
    //confirm("Product already exists. Would you like to update instead?")
    confirm("Information has not been changed. Would you like to re-enter details?");
    //alert("Successfully updated");
  }
}
