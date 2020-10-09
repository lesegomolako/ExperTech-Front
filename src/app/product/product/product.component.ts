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
      this.service.getProducts().subscribe(res => 
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
