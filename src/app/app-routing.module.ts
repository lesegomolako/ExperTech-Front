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
import { AdminComponent } from './User/admin/admin.component';
import { AvailableComponent } from './User/available/available.component';
import { CbookingComponent } from './User/cbooking/cbooking.component';
import { ClientComponent } from './User/client/client.component';
import { CompanyinfoComponent } from './User/companyinfo/companyinfo.component';
import { EmployeeComponent } from './User/employee/employee.component';
import { EmployeeSTComponent } from './User/employee-st/employee-st.component';
import { PaymentComponent } from './User/payment/payment.component';
import { PickupComponent } from './User/pickup/pickup.component';
import { ConfirmComponent } from './User/confirm/confirm.component';
import { SpackageComponent } from './User/spackage/spackage.component';
import { SalesReportComponent } from './Reporting/sales-report/sales-report.component';

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
  {path:'setup', component: SetupComponent},
  {path:'admin', component: AdminComponent},
  {path:'available', component: AvailableComponent},
  {path:'cbooking', component: CbookingComponent},
  {path:'client', component: ClientComponent},
  {path:'companyinfo', component: CompanyinfoComponent},
  {path:'employee', component: EmployeeComponent},
  {path:'employeeST', component: EmployeeSTComponent},
  {path:'payment', component: PaymentComponent},
  {path:'pickup', component: PickupComponent},
  {path:'confirm', component: ConfirmComponent},
  {path: 'spackage', component: SpackageComponent},
  {path: 'salereport', component: SalesReportComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
