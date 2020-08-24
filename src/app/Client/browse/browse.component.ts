import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import{ Product,BasketLine} from 'src/app/client';
import { ExperTexhService } from 'src/app/exper-texh.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.sass']
})
export class BrowseComponent implements OnInit {

  id: any;
  product :  Product[];
  basket: BasketLine[];
  name: string;
  submitted = false;
  productForm: FormGroup;

  constructor(public dialog: MatDialog, private api: ExperTexhService, private router: Router,private route: ActivatedRoute) { }
  openDialog() {
    confirm("Successfully added to product")
  }

  ngOnInit(): void {
 
    this.id = this.route.snapshot.params['id'];
    
    this.api.ViewProduct(this.id).subscribe(data => {
      console.log(data)
      this.product = data;
    }, error => console.log("error edit component",error));
    

}
list(){
  this.router.navigate(['ClientProfile']);
}

addproduct(){
  this.id = this.route.snapshot.params['id'];
    
  this.api.Addproduct(this.id).subscribe(data => {
    console.log(data)
    this.basket = data;
  }, error => console.log("error edit component",error));
}
}
