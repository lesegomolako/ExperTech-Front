import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Delete()
  {

    if(confirm("Are you sure you want to delete this?"))
    {
      alert("Successfully deleted")
    }
    
  }
}
