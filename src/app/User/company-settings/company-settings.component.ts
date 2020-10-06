import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormArray} from '@angular/forms';
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
  editSocials = false;

  CompanyInfo: CompanyInfo;
  TimesList: Timeslots[];
  Links: [];

 
  editCompanyData: FormGroup
  editTimes: FormGroup

  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {
      this.loadList();
      // this.editCompanyData = this.fb.group({
      //   Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      //   ContactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      //   Address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // })
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }

  }

  loadList()
  {
    this.service.GetTimes().subscribe(res => {this.TimesList = res; console.log(res)})
    this.service.GetCompanyInfo().subscribe(res => {this.CompanyInfo = res; console.log(res)})
  }

  cancel()
  {
    this.editCompany = false;
    this.editTime = false;
  }


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

  EditTimeSlots()
  {
    this.editTimes = this.fb.group({
      times: this.fb.array(
        [
          this.setTimes(this.TimesList)
        ]
      )
      
    })
    this.editTime = true;
  }

  setTimes(times: Timeslots[]): FormArray
  {
    const formArray = new FormArray([]);

    times.forEach(s => {formArray.push(
      this.fb.group({
        startTime: s.StartTime,
        endTime: s.EndTime,
        available: {checked: s.Available}
      })
    )})

    return formArray;
  }
}
