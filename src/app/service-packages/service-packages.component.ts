import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.css']
})
export class ServicePackagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Delete()
  {
    confirm("Are you sure you want to delete this?")
  }
}
