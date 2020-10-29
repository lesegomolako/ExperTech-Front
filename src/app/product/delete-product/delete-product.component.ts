import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { Router } from '@angular/router';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(public service: ProductService, private router: Router,
    private api: ExperTexhService, private snack: MatSnackBar
    ) { }

  formData;

  ngOnInit(): void {
    if(this.api.RoleID == "2")
    {
      this.formData = JSON.parse(localStorage.getItem("prodDelete"))
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
  }

  Cancel()
  {
    window.history.back();
  }

  Delete()
  {
    var ID = this.formData.ProductID;
    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteProduct(ID, this.api.SessionID).subscribe(res => 
        {
          if(res == "success")
          {
            this.snack.open("Product successfully deleted", "OK", {duration: 3000})
            this.router.navigateByUrl("AdminProduct");
            localStorage.removeItem("prodDelete")
          }
          else
          {
            alert("Error delete product. Redirecting to product screen");
            this.router.navigateByUrl("AdminProduct");
            localStorage.removeItem("prodDelete")
          }
        }, error => {console.log(error), this.snack.open("Something went wrong. Please try again later", "OK", {duration: 3000})})
      
    }
    
  }
}
