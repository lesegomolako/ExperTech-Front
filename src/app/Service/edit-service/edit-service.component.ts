import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../API Services/for Service/services.service';
import { Router } from '@angular/router';
import { NgForm, FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceData } from '../../API Services/for Service/services';
import {Observable} from 'rxjs';
import { formatCurrency, FormatWidth } from '@angular/common';
import { timestamp } from 'rxjs/operators';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

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
  
  constructor(public service: ServicesService, private router: Router, 
    private fb: FormBuilder, private api:ExperTexhService ) { }
  serviceForm: FormGroup;
  serviceObject: ServiceData;
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

    if(this.api.RoleID == "2")
    {
    this.serviceObject = JSON.parse(localStorage.getItem('sEdit'))

    this.serviceForm = this.fb.group({
      serviceid:[null],
      name: ['', [Validators.required]],
      description:[''],
      duration: ['', Validators.required],
      typeid: ['', Validators.required],
      sprice: this.fb.array([]),
      photos: this.fb.array([this.fb.group({photo: [null]})]),
      options: this.fb.array(
        [
          
        ])
    })
    this.serviceForm.valueChanges.subscribe((res)  =>
      {this.logValidationErrors(this.serviceForm)});
    this.checkForm();
  }
  else
  {
    this.router.navigate(["403Forbidden"])
  }
  }

  AddPrice()
  {
    (<FormArray>this.serviceForm.get('sprice')).push(this.setPrice());
  }

  setPrice():FormGroup
  {
    return this.fb.group({Price: new FormControl(null, Validators.required)})
  }

  validationMessages = 
  {
    'name' :
    {
      'required': 'Service name is required'
    },
    'duration': {'required':'Duration is required'},
    'typeid': {'required': 'Service type must be selected'},
    'Price': {'required': 'Price is required'},
    'OptionID': {'required': 'Service Option must be selected'}
  }

  formErrors =
  {
    'name':'',
    'duration':'',
    'typeid':'',
    'Price':'',
    'OptionID':''
  }

  logValidationErrors(group: FormGroup = this.serviceForm)
  {
      Object.keys(group.controls).forEach((key: string) =>
      {
        const abstractControl = group.get(key)
        if(abstractControl instanceof FormGroup)
          {this.logValidationErrors(abstractControl)}
        else
        {
          this.formErrors[key] = ''
          if (abstractControl && !abstractControl.valid && 
            (abstractControl.touched || abstractControl.dirty))
          {
            const messages = this.validationMessages[key]
            for(const errorKey in abstractControl.errors)
            {
              if (errorKey)
              {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
        }
      })
  }

  omit_special_char(event) {
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

  checkForm()
  {
    if(this.serviceObject == null)
    {
      this.title = "Add Service";
      this.AddPrice()
      //this.resetForm();
    }
    else
    {
      this.title = "Edit Service"
      this.editService();
    }
  }

  removeImage()
    {
      this.imageURL = null;
      this.UploadFile = null;
    }

  editService() //code to populate formGroup
  {
    this.serviceForm.patchValue(
      {
        serviceid: this.serviceObject.ServiceID,
        name: this.serviceObject.Name,
        description:this.serviceObject.Description,
        duration: this.serviceObject.Duration,
        typeid: this.serviceObject.TypeID,
      }
    );

    if(this.serviceObject.Image != null)
    {
      this.imageURL = this.serviceObject.Image;
    }
 
    if(this.serviceObject.ServicePrices == null)
    {
    this.serviceForm.setControl('options', this.setOptions(this.serviceObject.ServiceTypeOptions)); //populating formArray
    }
    else
    this.serviceForm.setControl('sprice', this.fb.array([this.fb.group(
      {
        Price: this.serviceObject.ServicePrices[0].Price
      })] ))
  }

  setOptions(optionsList: IOption[]): FormArray
  {
    const formArray = new FormArray([]); //formArray Object to return

    optionsList.forEach(s => {formArray.push(this.fb.group({
      OptionID: s.OptionID,
      ServicePrices: this.fb.array([this.fb.group(
      {
        Price: s.ServicePrices[0].Price
      })])
    }))}); //code to create form Array with data

    return formArray;
  }


  AddForm(): void
  {
    //this.service.ServicesData.ServicePrices = [{"sPrice": ""}];
    if((<FormArray>this.serviceForm.get('sprice')).at(0).value.Price != null)
    {
      if(confirm("Adding a service option would remove the price entered. Would you like to continue"))
      {
        (<FormArray>this.serviceForm.get('sprice')).removeAt(0);
        (<FormArray>this.serviceForm.get('options')).push(this.AddOptionGroup());
      }
    }
    else
    {
      (<FormArray>this.serviceForm.get('sprice')).removeAt(0);
      (<FormArray>this.serviceForm.get('options')).push(this.AddOptionGroup());
    }
    
    
  }

  AddOptionGroup(): FormGroup
  {
    return this.fb.group(
      {
        OptionID: new FormControl(null, Validators.required), ServicePrices: this.fb.array([this.fb.group(
          {
            Price: new FormControl(null, Validators.required)
          })])
      })
  }

  onSubmit(): void
  {
    //this.serviceForm.getError('name').value
    if(this.serviceForm.value.serviceid == null)
    {
       this.mapValues();
       var ServiceID;
       this.service.AddService(this.serviceObject, this.UploadFile, this.api.SessionID).subscribe((res:any) => {

        if(res.Message == "success")
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
       this.service.UpdateService(this.serviceObject, this.UploadFile, this.api.SessionID).subscribe(res => {

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
    this.serviceObject = 
    {
      ServiceID: this.serviceForm.value.serviceid,
      Name: this.serviceForm.value.name,
      Description: this.serviceForm.value.description,
      Duration: this.serviceForm.value.duration,
      TypeID: this.serviceForm.value.typeid,
      ServicePrices: this.serviceForm.value.sprice,
      ServiceTypeOptions: this.serviceForm.value.options,
      ServicePhotoes: this.serviceForm.value.photos
      
    }
    // this.serviceObject.Name = this.serviceForm.value.name;
    // this.serviceObject.Description = this.serviceForm.value.description;
    // this.serviceObject.Duration = this.serviceForm.value.duration;
    // this.serviceObject.TypeID = this.serviceForm.value.typeid;
    // this.serviceObject.ServicePrices = this.serviceForm.value.sprice
    // this.serviceObject.ServiceTypeOptions = this.serviceForm.value.options;
    // //this.serviceObject.ServiceImage = this.serviceForm.value.photos;
    

    // if(this.serviceObject.ServiceTypeOptions.length>0)
    // {
    //   this.serviceObject.ServicePrices = null
    // }
  }

  removeOption(item: number): void
  {
  
    (<FormArray>this.serviceForm.get('options')).removeAt(item);

    if((<FormArray>this.serviceForm.get('options'))?.length == 0)
    {
      this.AddPrice();
    }
  }
  

  // resetForm(form?: NgForm)
  // {
  //   if (form != null)
  //   form.reset();

    
  //   this.serviceObject = 
  //   {
  //     ServiceID: null,
  //     Name: "",
  //     ServiceType: "",
  //     TypeID: null,
  //     Description: "",
  //     Duration: null,

  //     ServiceImage:
  //     {
  //       Photo: null,
  //     },

  //     ServicePrices:  null,
      
    
  //     ServiceTypeOptions: null
  //   }
  // }


}
