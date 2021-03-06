import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product, BasketLine } from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { ProductService } from '../../API Services/for Product/product.service'
import { ProductData } from 'src/app/API Services/for Product/product';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from 'src/app/app.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.sass']
})
export class BrowseComponent implements OnInit {

  basketID = "1"; // PLEASE IMPLEMENT THE SESSION SO THAT THE USER GETS THEIR BASKET ID FROM THE API
  id: any;
  product: ProductData[];
  displayList: ProductData[];
  basket: BasketLine[];
  name: string;
  submitted = false;
  productForm: FormGroup;
  RoleID = this.api.RoleID;



  myImages;



  constructor(public dialog: MatDialog, private api: ExperTexhService,
    private router: Router, private route: ActivatedRoute,
    private service: ProductService, private snack: MatSnackBar,
    public domSanitizer: DomSanitizer) { }
  openDialog() {
    confirm("Successfully added to product")
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.cols = (window.innerWidth <= 700) ? 2 : 4;

    this.service.getProducts().subscribe((data: any) => {
      this.product = data;
      this.displayList = data;
      //console.log(this.myImages)
      // this.product.forEach(p=>{
      //   p.SelectedQuantity=0;
      // })
    }, error => console.log("error edit component", error));


  }

  ViewDetails(x: ProductData) {
    alert("hello");
  }

  cols = 4;
  onResizeEvent(event) {
    this.cols = (event.target.innerWidth <= 850) ? 2 : 4;
  }

  list() {
    this.router.navigate(['browse']);
  }

  filter(number) {
    if (number == 0) {
      this.product = this.displayList;
    }
    else if (number == 1) {
      this.product = this.displayList.filter(zz => zz.CategoryID == 1)
    }
    else if (number == 2) {
      this.product = this.displayList.filter(zz => zz.CategoryID == 2)
    }
  }

  setQuantity(newValue, item: Product) {
    var num = newValue.target.value;
    if (num <= 0) {
      newValue.target.value = 1;
      newValue.target.focus();
      return;
    }

    if (num > item.QuantityOnHand) {
      newValue.target.value = item.QuantityOnHand;
      newValue.target.focus();
      return;
    }

    item.SelectedQuantity = Number(newValue.target.value)
  }


  addproduct(BasketProduct: Product) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.data = BasketProduct;

    const dialogRef = this.dialog.open(ProductDialog, dialogConfig)
  }
}


@Component({
  selector: 'product-dialog',
  templateUrl: './description.html'
})
export class ProductDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProductDialog>, private router: Router, private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product, private api: ExperTexhService) { }

  basket: BasketLine[];
  RoleID;
  ngOnInit() {

    this.RoleID = this.api.RoleID;

  }

  setQuantity(newValue, item: Product) {
    var num = newValue.target.value;
    if (num <= 0) {
      newValue.target.value = 1;
      newValue.target.focus();
      return;
    }

    if (num > item.QuantityOnHand) {
      newValue.target.value = item.QuantityOnHand;
      newValue.target.focus();
      return;
    }

    item.SelectedQuantity = Number(newValue.target.value)
  }

  addproduct(BasketProduct: Product) {

    if (this.api.SessionID != null) {
      //this.id = this.route.snapshot.params['id'];
      var _basketLine: BasketLine = {
        Product: BasketProduct,
        ProductID: BasketProduct.ProductID,
      }

      if (BasketProduct.SelectedQuantity > BasketProduct.QuantityOnHand) {
        this.snack.open("Quantity selected is more than quantity available", "OK", { duration: 3000 })
        return;
      }

      if (BasketProduct.SelectedQuantity == null) {
        BasketProduct.SelectedQuantity = 1;
      }

      _basketLine.Quantity = BasketProduct.SelectedQuantity;

      this.api.Addproduct(_basketLine).subscribe(data => {
        this.basket = data;
      }, error => console.log("error edit component", error));
      window.location.reload();
    }
    else {
      if (confirm("You may only add a product when logged in. Would you like to log in?")) {
        localStorage.setItem('redirectTo', this.router.url);
        this.router.navigateByUrl('/login');
      }
    }
  }
}
