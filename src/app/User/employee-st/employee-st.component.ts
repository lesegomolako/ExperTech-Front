import { Component, OnInit, Provider } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-employee-st',
  templateUrl: './employee-st.component.html',
  styleUrls: ['./employee-st.component.sass'],
})
export class EmployeeSTComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: ReportingService
  ) {}

  List: Observable<Process[]>;
  employeestForm: FormGroup;
  submitted = false;
  public EmployeestFormGroup: FormGroup;
  STobject = this.service.formData;
 
  serviceForm: FormGroup;
  //serviceObject: this.service.ServiceData;

  ngOnInit() {
       this.loadList();
  }

  loadList(){
    this.List = this.service.employeeServiceType()
    this.STobject = this.service.formData;
  }

  onSubmit(){}
  //  AddServiceType(): FormGroup{
  //   return this.formBuilder.group(
  //   return TypeID: new FormControl(),
  //   )
  // }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  AddForm(){
    (<FormArray>this.employeestForm.get('itemLine')).push(this.AddEmployeeServiceType());
  }

  AddEmployeeServiceType(): FormGroup{
    return this.formBuilder.group({
      quantity: new FormControl(),
      TypeID: new FormControl()
    })
  }

  // UpdateEmployee(form: NgForm) {
  //   this.service.updateEmployee(form.value).subscribe((ref) => {
  //     this.loadList();
  //   });
  // }
  
  previousForm() {
    window.history.back();
  }
  
  hide = true;
  matcher = new ErrorStateMatcher();
}
