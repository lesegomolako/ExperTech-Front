import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

interface Type {
  name: string;
 
}
interface Service {
  name: string;
}
interface Option {
  name: string;
}
interface Employee {
  name: string;
}
interface Time {
  name: string;
}
@Component({
  selector: 'app-requestb',
  templateUrl: './requestb.component.html',
  styleUrls: ['./requestb.component.sass']
})
export class RequestbComponent implements OnInit {

  bookingControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  types: Type[] = [
    {name: 'Hair'},
    {name: 'Nails'},
    {name: 'Massage'},

  ];
  services: Service[] = [
    {name: 'wash and blow'},
    {name: 'Color'},
    {name: 'Relaxer'},

  ];
  options: Option[] = [
    {name: 'Long'},
    {name: 'Medium'},
    {name: 'Short'},

  ];
  employees: Employee[] = [
    {name: 'Jane'},
    {name: 'Ally'},
    {name: 'Refiloe'},

  ];
   times: Time[] = [
    {name: '08:00-09:00'},
    {name: '08:30-09:30'},
    {name: '09:30-10:30'},
    {name: '11:30-12:30'},
    {name: '12:30-13:30'},
    {name: '13:00-14:30'},
  ];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
