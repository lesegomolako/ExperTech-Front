import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/API Services/for Product/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductData } from 'src/app/API Services/for Product/product';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExperTexhService } from 'src/app/API Services/for Booking/exper-texh.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductData>;

  displayedColumns = ['Name', 'Category', 'Price', 'Quantity', 'Edit', 'Delete'];

  constructor(public service: ProductService, private api:ExperTexhService,
     private router: Router) { }

  ProductList :ProductData[];
  dataSource;

  ngOnInit(): void {

    if(this.api.RoleID == "2")
    {
      localStorage.clear();
      this.dataSource = new MatTableDataSource(this.ProductList)
      this.service.getProducts().subscribe((res:any) => 
        {
          this.ProductList = res;
          this.dataSource.data = this.ProductList          
        });
    }
    else
    {
      this.router.navigate(["403Forbidden"])
    }
    
  }

  closeModal()
  {
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
  }

  ViewImage(data: ProductData)
  {
    // Get the modal
    var modal = document.getElementById("myModal");
          
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = <HTMLImageElement>document.getElementById("img01");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = data.Image
    captionText.innerHTML = data.Name
     
  }

  ngAfterViewInit()
  {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    
  }

  addProduct()
  { 
    //this.service.ProductForm = null;
    localStorage.removeItem('prodEdit')
    this.router.navigateByUrl("/EditProduct")
  }

  editProduct(data: ProductData)
  {
     //this.service.ProductForm = data;
     localStorage.setItem('prodEdit', JSON.stringify(data))
     this.router.navigateByUrl("/EditProduct")
  }

  deleteProduct(data: ProductData)
  {
    //this.service.ProductForm = data;
    localStorage.setItem('prodDelete', JSON.stringify(data))
    this.router.navigateByUrl("/DeleteProduct")
  }

}
