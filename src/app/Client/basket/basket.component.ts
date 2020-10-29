import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasketLine } from '../../API Services/for Booking/client';
import { ExperTexhService } from '../../API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from 'src/app/app.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  id: any;
  basket: BasketLine[];
  name: string;
  quantity: any;
  total = 0;
  pro = 0;

  constructor(public dialog: MatDialog, private api: ExperTexhService, private snack: MatSnackBar,
    private router: Router, private route: ActivatedRoute) { }

  SubmitBasket() {
    const dialogRef = this.dialog.open(LoadingDialog, { disableClose: true })
    if (confirm("Click ok to submit basket and place order")) {
      this.api.SubmitBasket().subscribe(res => {
        if (res == "success") {
          dialogRef.close();
          this.snack.open("Basket successfully successfully submitted. Check your email/sms for more details", "OK", {duration:3000})
          window.location.reload();
        }
      }, error => {console.log(error), dialogRef.close(), this.snack.open("Something went wrong. Please try again later", "OK", {duration:3000})})
    }
  }

  ngOnInit() {
    //this.basket = new BasketLine();

    if (this.api.RoleID == "1") {
      this.quantity = 0;

      this.id = this.route.snapshot.params['id'];


      this.api.ViewBasket(this.api.SessionID).subscribe((data: BasketLine[]) => {
        if (data.length > 0) {
          this.basket = data;
          this.cal();
          this.item();
        }

      }, error => console.log("error edit component", error));
    }
    else {
      this.router.navigate(["403Forbidden"])
    }


  }
  list() {
    this.router.navigate(['basket']);
  }

  cal() {
    this.total = 0;
    this.basket.forEach(res => {
      this.total += (res.Quantity * res.Product.Price)
    })
    
  }

  item() {

    this.pro = 0
    this.basket.forEach(res => {

      this.pro += (res.Quantity)
    })

    this.api.badgeCount = this.pro;
  }



  remove(item_in_basket: BasketLine) {

    console.log("REMOVE LINE :" + item_in_basket.Product.Name)
    this.api.RemoveProduct(item_in_basket.BasketID, item_in_basket.ProductID).subscribe(data => {
      for (var i = 0; i < this.basket.length; i++) {
        var single: BasketLine = this.basket[i];
        if (single.ProductID == item_in_basket.ProductID)
          this.basket.splice(i, 1)
      }
      window.location.reload();
      //alert("Successfully removed Product "+item_in_basket.Product.Name)
    }, error => console.log("Error", error));
    this.api.getBadgeCount()
  }

  updateBasket(event, line: BasketLine) {
    var num = Number(event.target.value)

    if(num == 0)
    {
      num = 1;
      event.target.value = 1;
      event.target.focus();
    }

    if (num > line.Product.QuantityOnHand) {
      this.snack.open("Quantity selected is more than available stock", "OK", { duration: 2000 })
      event.target.value = line.Quantity;
      event.target.focus();
      return;
    }
    line.Quantity = num;
    this.item();
    this.cal();
    this.api.Updateproduct(line).subscribe(data => {
    }, error => console.log("error edit component", error));

  }

  cancel() {
    window.history.back();
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
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
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
