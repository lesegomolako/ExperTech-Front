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
      this.editTimes = this.fb.group({
        times: this.fb.array([])  
      })
      this.CreateForms();
     
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }

  }

  CreateForms()
  {
    this.editSocials = this.fb.group(
      {
        socialid: [null],
        name: ['', [Validators.required, Validators.maxLength(50)]],
        link: ['', [Validators.required, Validators.maxLength(150)]]
      }
    )
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
    this.editSocials.reset()
    this.editSocial = true;
  }

  EditSocialMedia(SocialMedia: SocialMedia)
  {
    this.editSocials.patchValue({
      socialid: SocialMedia.SocialID,
      name: SocialMedia.Name,
      link: SocialMedia.Link
    })
    this.editSocial = true;
  }

  DeleteSocialMedia(InfoID)
  {
    if(confirm("Are you sure you want to delete this link?"))
    {
      this.service.DeleteSocials(InfoID, this.api.SessionID).subscribe((res:any) => 
        {
          if(res == "success")
          {
            alert("Social media link successfully deleted")
            this.loadList();
          }
          else if(res.Error == "session")
          {
            alert(res.Message)
          }
          else
          {
            console.log(res)
          }
        })
    }
  }

  get company() {
    return this.editCompanyData.controls;
  }

 

  linksObject;
  saveLinks()
  {
    if(this.editSocials.invalid)
    {
      
      this.editSocials.markAllAsTouched();
      return;
    }
    let id = this.editSocials.value.socialid;

    if(id == null)
    {
      this.service.AddSocials(this.editSocials.value, this.api.SessionID).subscribe((res:any) =>
        {
          if(res == "success")
          {
            alert("Successfully added social media link")
            this.loadList();
            this.editSocial = false;
          }
          else if(res.Error == "session")
          {
            alert(res.Message)
          }
          else
          {
            console.log(res)
          }
        })
    }
    else
    {
      this.service.EditSocials(this.editSocials.value, this.api.SessionID).subscribe((res:any) =>
        {
          if(res == "success")
          {
            alert("Successfully updated social media link")
            this.loadList();
            this.editSocial = false;
          }
          else if(res.Error == "session")
          {
            alert(res.Message)
          }
          else
          {
            console.log(res)
          }
        })
    }
    
  }

  get social()
  {
    return this.editSocials.controls;
  }

  DeleteForm(linkID: any): void
  {
    (<FormArray>this.editSocials.get('links')).removeAt(linkID);
  }



  //************************Company Info ******************/
  EditCompanyInfo(Data: CompanyInfo)
  {
    this.editCompanyData = this.fb.group({
      infoid: [Data.InfoID],
      Name: [Data.Name, [Validators.required, Validators.maxLength(150)]],
      ContactNo: [Data.ContactNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Address: [Data.Address, [Validators.required,  Validators.maxLength(250)]],
    })
    this.editCompany = true;
    
  }

  SaveCompanyInfo()
  {
    if(this.editCompanyData.invalid)
    {
      this.editCompanyData.markAllAsTouched();
      alert("Fill in all required details")
      return;
    }

    this.service.updateCompany(this.editCompanyData.value, this.api.SessionID).subscribe((res:any) =>
      {
        if(res == "success")
        {
          alert("Company Info successfully updated");
          this.editCompany = false;
          this.loadList();
        }
        else if(res.Error == "session")
        {
          alert(res.Message);
        }
        else
        {
          console.log(res)
        }
      }
    )
    
  }

   //************************Timeslots ******************/
  EditTimeSlots()
  {
    
    this.editTimes.setControl('times', this.setTimes(this.TimesList));
    this.editTime = true;
  }

  timesObject: Timeslots[];
  SaveTimeslot()
  {
    var Total = 0;
    this.timesObject = this.editTimes.value.times;
    this.timesObject.forEach((s:any) => 
      {
        if(s.available == true)
        {
          Total++;
        }
      })

    if(Total < 5)
    {
      alert("At least 5 timeslots have to be selected")
      return;
    }


    this.service.updateTimes(this.editTimes.value.times, this.api.SessionID).subscribe((res:any) =>
      {
        if(res =="success")
        {
          alert("Times successfully updated");
          this.loadList();
          this.editTime = false;
        }
        else if(res.Error = "session")
        {
          alert(res.Message);
        }
        else
        {
          console.log(res);
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
        available: s.Available
      })
    )})

    console.log(formArray)
    return formArray;
  }

  omit_special_num_char(event) {
    var theEvent = event || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }
}
