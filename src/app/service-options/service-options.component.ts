import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-options',
  templateUrl: './service-options.component.html',
  styleUrls: ['./service-options.component.css']
})
export class ServiceOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Delete()
  {
    confirm("Are you sure you want to delete this?")
  }
}
