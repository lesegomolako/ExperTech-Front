import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(public service: ProductService, private router: Router) { }

  formData = JSON.parse(localStorage.getItem("prodDelete"))

  ngOnInit(): void {
  }

  Delete()
  {
    var ID = this.formData.ProductID;
    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteProduct(ID).subscribe(res => 
        {
          if(res == "success")
          {
            alert("Successfully deleted");
            this.router.navigateByUrl("AdminProduct");
          }
          else
          {
            alert("Error delete product. Redirecting to product screen");
            this.router.navigateByUrl("AdminProduct");
          }
        })
      
    }
    
  }
}
