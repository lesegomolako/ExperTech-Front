import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.css']
})
export class DeleteServiceComponent implements OnInit {

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
