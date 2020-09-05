import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './Service/services/services.component';
import { ServiceTypeComponent } from './Service/service-type/service-type.component';
import { TServicesComponent } from './Service/tservices/tservices.component';
import { ServiceOptionsComponent } from './Service/service-options/service-options.component';
import { ServicePackagesComponent } from './Service/service-packages/service-packages.component';
import { EditSTComponent } from './Service/edit-st/edit-st.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { EditServiceComponent } from './Service/edit-service/edit-service.component';
import { EditSOComponent } from './Service/edit-so/edit-so.component';
import { EditSPComponent } from './Service/edit-sp/edit-sp.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductComponent } from './Product/product/product.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { DeleteServiceTypeComponent } from './Service/delete-service-type/delete-service-type.component';
import { DeleteSOComponent } from './Service/delete-so/delete-so.component';
import { DeleteServiceComponent } from './Service/delete-service/delete-service.component';
import { LoginComponent } from './User/login/login.component';
import { ForgotComponent } from './User/forgot/forgot.component';
import { RegisterComponent } from './User/register/register.component';
import { SetupComponent } from './User/setup/setup.component';
import { FpasswordComponent } from './User/fpassword/fpassword.component';

//import {MatDialogModule} from '@angular/material/dialog';



const routes: Routes = [

  {path: '', redirectTo: '/home',pathMatch: 'full'},

  {path:'services', component: ServicesComponent,
   children: [
      {path:'', redirectTo: 'ServiceTypes',pathMatch: 'full' },
      {path:'ServiceTypes', component: ServiceTypeComponent},
      {path:'Services', component: TServicesComponent},
      {path:'ServiceOptions', component: ServiceOptionsComponent},
      {path:'ServicePackages', component: ServicePackagesComponent},
      {path:'EditServiceType', component: EditSTComponent},
      {path:'EditService', component: EditServiceComponent},
      {path:'EditServiceOption', component: EditSOComponent},
      {path:'CreateServicePackage', component: EditSPComponent},
      {path:'DeleteServiceType', component: DeleteServiceTypeComponent},
      {path:'DeleteServiceOption', component: DeleteSOComponent},
      {path:'DeleteService', component: DeleteServiceComponent},
         
      
   ]
  },

  {path:'home', component: ClientMenuComponent},
  {path:'EditProduct', component: EditProductComponent},
  {path:'AdminProduct', component: ProductComponent},
  {path:'DeleteProduct', component: DeleteProductComponent},
  {path:'login', component: LoginComponent},
  {path:'forgot', component: ForgotComponent},
  {path:'fpassword', component: FpasswordComponent},
  {path:'register', component: RegisterComponent},
  {path:'setup', component: SetupComponent}
   
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
