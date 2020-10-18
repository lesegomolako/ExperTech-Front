import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private api: ExperTexhService, private route: Router) { }

  ngOnInit(): void {
    if(this.api.RoleID != "2")
    {
      this.route.navigate(["403Forbidden"])
    }

  }

  

}
