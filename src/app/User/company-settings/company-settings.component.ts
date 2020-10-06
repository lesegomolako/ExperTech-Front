import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormArray, Form} from '@angular/forms';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { ReportingService } from 'src/app/API Services/for User/reporting.service';

export interface CompanyInfo
{
  InfoID: any;
  Name: string;
  Address: string;
  ContactNo: string;
}

export interface Timeslots
{
  TimeID: any;
  StartTime: any;
  EndTime: any;
  Available: any;
}

export interface SocialMedia
{
  SocialID: any;
  Name: string;
  Link: string;
}

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent implements OnInit {

  constructor(private api: ExperTexhService, private service: ReportingService, 
    private router: Router, private fb: FormBuilder) { }

  editCompany = false;
  editTime = false;
  editSocial = false;

  CompanyInfo: CompanyInfo;
  TimesList: Timeslots[];
  Links: SocialMedia[];

 
  editCompanyData: FormGroup;
  editTimes: FormGroup;
  editSocials: FormGroup;

  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {
      this.loadList();
     
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }

  }

  loadList()
  {
    this.service.GetTimes().subscribe(res => {this.TimesList = res})
    this.service.GetCompanyInfo().subscribe(res => {this.CompanyInfo = res})
    this.service.GetSocials().subscribe(res => {this.Links = res;})
  }

  cancel()
  {
    this.editCompany = false;
    this.editTime = false;
    this.editSocial = false;
  }

  AddSocialMedia()
  {
    this.editSocials = this.fb.group(
      {
        links: this.fb.array([
          this.AddLinksControls()
        ])
      }
    )
    this.editSocial = true;
  }

  AddForm()
  {
    (<FormArray>this.editSocials.get('links')).push(this.AddLinksControls())
  }

  AddLinksControls():FormGroup
  {
    return this.fb.group({
      socialid: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      link: ['', [Validators.required, Validators.maxLength(150)]]
    })
  }

  setLinkControls(data: SocialMedia[]):FormArray
  {
    const formArray = new FormArray([]);

    data.forEach(s => {formArray.push(
      this.fb.group({
        socialid: s.SocialID,
        name: s.Name,
        link: s.Link,
      })
    )})
 
    return formArray;
  }

  linksObject;
  saveLinks()
  {
    this.linksObject = this.editSocials.value.links
  }

  //************************Company Info ******************/
  EditCompanyInfo(Data: CompanyInfo)
  {
    this.editCompanyData = this.fb.group({
      Name: [Data.Name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ContactNo: [Data.ContactNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Address: [Data.Address, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
    this.editCompany = true;
    
  }

  SaveCompanyInfo()
  {
    this.editCompany = false;
  }

   //************************Timeslots ******************/
  EditTimeSlots()
  {
    this.editTimes = this.fb.group({
      times: this.fb.array([])  
    })
    this.editTimes.setControl('times', this.setTimes(this.TimesList));
    this.editTime = true;
  }

  timesObject;
  SaveTimeslot()
  {
    this.timesObject = this.editTimes.value.times;

    this.service.updateTimes(this.timesObject).subscribe(res =>
      {
        if(res =="success")
        {

        }
      })
  }

  setTimes(times: Timeslots[]): FormArray
  {
   
    const formArray = new FormArray([]);

    times.forEach(s => {formArray.push(
      this.fb.group({
        timeid: s.TimeID,
        startTime: s.StartTime,
        endTime: s.EndTime,
        available: {checked: s.Available}
      })
    )})

    
    return formArray;
  }
}
