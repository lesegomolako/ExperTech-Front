import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperTexhService } from '../API Services/for Booking/exper-texh.service';
import { ReportingService } from '../API Services/for User/reporting.service';
import { CompanyInfo, SocialMedia } from '../User/company-settings/company-settings.component';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.css']
})
export class ClientMenuComponent implements OnInit {

  constructor(private service: ReportingService, private api: ExperTexhService) { }

  ngOnInit(): void {
    this.links = this.service.GetSocials();
    this.companyinfo = this.service.GetCompanyInfo();

    console.log(this.links)
  }

  links: Observable<SocialMedia[]>;
  companyinfo: Observable<CompanyInfo>;

}
