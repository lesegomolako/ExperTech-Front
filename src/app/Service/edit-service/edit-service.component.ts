import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { NgForm, FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceData } from '../../API Services/for Service/services';
import {Observable} from 'rxjs';
import { formatCurrency, FormatWidth } from '@angular/common';
import { timestamp } from 'rxjs/operators';

export class IOption
{
  Option: string; OptionID: any; ServicePrices:  [{ Price: number;}]
}

export class IPrice
{
  Price: number;
}

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  
  constructor(public service: ServicesService, private router: Router, private fb: FormBuilder ) { }
  serviceForm: FormGroup;
  serviceObject;
  //options = this.service.getServiceOptions('options') as FormArray
 

  title: string;
  OptionsList = this.service.getServiceOptions();
  TypeList = this.service.getServiceTypes();

  UploadFile: File = null;
  imageURL: string = null;

  onFileChanged(event)
  {
    this.UploadFile= event.target.files[0]

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.UploadFile);
  }

  //home = new ServiceData().ServiceTypeOptions[0]
  //dataarray = new ServiceData().ServiceTypeOptions;
  Cancel()
  {
    window.history.back();
  }

  ngOnInit(): void {

    this.serviceObject = JSON.parse(localStorage.getItem('sEdit'))

    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description:['', Validators.required],
      duration: ['', Validators.required],
      typeid: ['', Validators.required],
      sprice: this.fb.array([this.fb.group({price: new FormControl()})]),
      photos: this.fb.array([this.fb.group({photo: ['', Validators.required]})]),
      options: this.fb.array(
        [
          
        ])
    })

    this.checkForm();

  }

  checkForm()
  {
    if(this.serviceObject == null)
    {
      this.title = "Add Service";
      this.resetForm();
    }
    else
    {
      this.title = "Edit Service"
      this.editService();
    }
  }

  editService() //code to populate formGroup
  {
    this.serviceForm.patchValue(
      {
        name: this.serviceObject.Name,
        description:this.serviceObject.Description,
        duration: this.serviceObject.Duration,
        typeid: this.serviceObject.TypeID,
      }
    );
 
    if(this.serviceObject.ServicePrices == null)
    {
    this.serviceForm.setControl('options', this.setOptions(this.serviceObject.ServiceTypeOptions)); //populating formArray
    }
    else
    this.serviceForm.setControl('sprice', this.fb.array([this.fb.group(
      {
        price: this.serviceObject.ServicePrices[0].Price
      })] ))
  }

  setOptions(optionsList: IOption[]): FormArray
  {
    const formArray = new FormArray([]); //formArray Object to return

    optionsList.forEach(s => {formArray.push(this.fb.group({
      optionid: s.OptionID,
      serviceprices: this.fb.array([this.fb.group(
      {
        price: s.ServicePrices[0].Price
      })])
    }))}); //code to create form Array with data

    return formArray;
  }


  AddForm(): void
  {
    //this.service.ServicesData.ServicePrices = [{"sPrice": ""}];
    
    (<FormArray>this.serviceForm.get('options')).push(this.AddOptionGroup());
    
  }

  AddOptionGroup(): FormGroup
  {
    return this.fb.group(
      {
        optionid: new FormControl(), serviceprices: this.fb.array([this.fb.group(
          {
            price: new FormControl()
          })])
      })
  }

  onSubmit(): void
  {
    //this.serviceForm.getError('name').value
    if(this.serviceObject.ServiceID == null)
    {
       this.mapValues();
       this.service.AddService(this.serviceObject).subscribe(res => {

        if(res == "success")
        {
          alert("Successfully saved")
          this.router.navigateByUrl("/services/Services")
        }
        else if(res == "duplicate")
        {
          if(confirm("Service already exists. Would you like to update instead?"))
          {
            
          }
        }
       })
    }
    else
    {
      this.mapValues();
       this.service.UpdateService(this.serviceObject).subscribe(res => {

        if(res == "success")
        {
          alert("Successfully saved")
        }
        else if(res == "duplicate")
        {
          if(confirm("Service already exists. Would you like to update instead?"))
          {
            
          }
        }
       })
    }
    // this.mapValues();
    // console.log(this.serviceObject.ServiceTypeOptions)
    // console.log(this.serviceForm.value.sprice)
   }

   

  mapValues()
  {
    this.serviceObject.Name = this.serviceForm.value.name;
    this.serviceObject.Description = this.serviceForm.value.description;
    this.serviceObject.Duration = this.serviceForm.value.duration;
    this.serviceObject.TypeID = this.serviceForm.value.typeid;
    this.serviceObject.ServicePrices = this.serviceForm.value.sprice
    this.serviceObject.ServiceTypeOptions = this.serviceForm.value.options;
    this.serviceObject.ServiceImage = this.serviceForm.value.photos;
    

    if(this.serviceObject.ServiceTypeOptions.length>0)
    {
      this.serviceObject.ServicePrices = null
    }
  }

  removeOption(item: number): void
  {
  
    (<FormArray>this.serviceForm.get('options')).removeAt(item);

  
  }
  

  resetForm(form?: NgForm)
  {
    if (form != null)
    form.reset();

    
    this.serviceObject = 
    {
      ServiceID: null,
      Name: "",
      ServiceType: "",
      TypeID: null,
      Description: "",
      Duration: null,

      ServiceImage:
      {
        Photo: null,
      },

      ServicePrices:  null,
      
    
      ServiceTypeOptions: null
    }
  }


}
