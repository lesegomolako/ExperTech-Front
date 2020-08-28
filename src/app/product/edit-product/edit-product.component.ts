import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  categoryList: [];
  SupplierList: [];
  title: string;

  UploadFile: File = null;
  imageURL: string = null;
  
  constructor(private http: HttpClient, private router: Router
    , public service: ProductService
    ) { }

    onFileChanged(event)
    {
      this.UploadFile= event.target.files[0]

      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageURL = event.target.result;
      }
      reader.readAsDataURL(this.UploadFile);
    }

  ngOnInit(): void {
    this.http.get<[]>("https://localhost:44380/api/Products/getSuppliers")
    .subscribe(res => {
      this.SupplierList = res;
    })

    this.http.get<[]>("https://localhost:44380/api/Products/getCategories")
    .subscribe( res => {
      this.categoryList = res;
    })

    if(this.service.ProductForm == null)
    {
      this.title = "Add Product";
      this.resetForm();
    }
    else
    {
      this.title = "Edit Product";
    }
  }

  onSubmit(form: NgForm)
  {
    if(form.value.ProductID == null)
    {
      this.AddProduct(form);
     
    }
    else
    {
      this.EditProduct(form);
    }
  }

  AddProduct(form: NgForm)
  {
    this.service.AddProduct(form.value)
    .subscribe(res => 
      {
        if(res == "success")
        {
          alert("Successfully saved")
        }
        else if(res == "duplicate")
      {
        if (confirm("Product already exists. Would you like to update instead?"))
        {
          this.service.ProductForm = form.value;
          window.location.reload();
        }
        else
        {
          this.router.navigateByUrl("AdminProduct")
        }
      }
      else
      {
        return res
      }
      })
  }

  EditProduct(form: NgForm)
  {
    if(form.value == this.service.ProductForm)
    confirm("Information has not been changed. Would you like to re-enter details?");
    else
    {
    this.service.UpdateProduct(form.value).subscribe(res =>
      {
        if(res == "success")
        {
          alert("Successfully updated");
          this.router.navigateByUrl("AdminProduct")
        }
    })
  }

}

  Cancel()
{
  window.history.back();
}

  resetForm(form?: NgForm)
{
    if (form != null)
    form.reset();

    
    this.service.ProductForm = 
    {
      ProductID: null,
      Name: null,
      Description: null,
      QuantityOnHand: null,
      Price: null,
      SupplierID: null,
      CategoryID: null,
      Category: null,
      Supplier: null,

      Photos:
      [
        {
            PhotoID: null,
            Photo: null,
        }
      ]
    }

    }
}
