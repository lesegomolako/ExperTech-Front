import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { TServicesComponent } from './tservices/tservices.component';
import { ServiceOptionsComponent } from './service-options/service-options.component';
import { ServicePackagesComponent } from './service-packages/service-packages.component';
import { EditSTComponent } from './edit-st/edit-st.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditSOComponent } from './edit-so/edit-so.component';
import { EditSPComponent } from './edit-sp/edit-sp.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductComponent } from './product/product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DeleteServiceTypeComponent } from './delete-service-type/delete-service-type.component';
import { DeleteSOComponent } from './delete-so/delete-so.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AvailableComponent } from './available/available.component';
import { CbookingComponent } from './cbooking/cbooking.component';
import { ClientComponent } from './client/client.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { EmployeeComponent } from './employee/employee.component';
import { ForgotComponent } from './forgot/forgot.component';
import { PaymentsComponent } from './payments/payments.component';
import { PickupComponent } from './pickup/pickup.component';
import { RegisterComponent } from './register/register.component';
import { SetupComponent } from './setup/setup.component';
import { SpackageComponent } from './spackage/spackage.component';


const routes: Routes = [

  {path: '', redirectTo: '/services',pathMatch: 'full'},

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
      {path:'EditServicePackage', component: EditSPComponent},
      {path:'DeleteServiceType', component: DeleteServiceTypeComponent},
      {path:'DeleteServiceOption', component: DeleteSOComponent},
      {path:'DeleteService', component: DeleteServiceComponent},
      {path:'Login', component: LoginComponent}, 
      {path:'admin', component: AdminComponent}, 
      {path:'available', component: AvailableComponent}, 
      {path:'cbooking', component: CbookingComponent},
      {path:'client', component: ClientComponent},
      {path:'confirm', component: ConfirmComponent},
      {path:'employee', component: EmployeeComponent},
      {path:'forgot', component: ForgotComponent},
      {path:'payment', component: PaymentsComponent},
      {path:'pickup', component: PickupComponent},
      {path:'register', component: RegisterComponent},
      {path:'setup', component: SetupComponent},
      {path:'spackage', component: SpackageComponent}
      
   ]
  },

  {path:'c-menu', component: ClientMenuComponent},
  {path:'EditProduct', component: EditProductComponent},
  {path:'AdminProduct', component: ProductComponent},
  {path:'DeleteProduct', component: DeleteProductComponent},
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
