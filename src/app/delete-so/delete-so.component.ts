import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-so',
  templateUrl: './delete-so.component.html',
  styleUrls: ['./delete-so.component.css']
})
export class DeleteSOComponent implements OnInit {

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
