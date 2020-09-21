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
import { ValidateComponent } from './components/TextBoxValidator/validate/validate.component';
import { EditComponent } from './Client/edit/edit.component';
import { BrowseComponent } from './product/browse/browse.component';
import { RequestbComponent } from './Booking/requestb/requestb.component';
import { BasketComponent } from './Client/basket/basket.component';
import { MakebookingComponent } from './Booking/makebooking/makebooking.component';
import { ViewbookingComponent } from './Client/viewbooking/viewbooking.component';
import { ServicepComponent } from './Client/servicep/servicep.component';
import { BookingConfirmComponent } from './Booking/confirm/confirm.component';
import { ClientprofileComponent } from './Client/clientprofile/clientprofile.component';
import { BellComponent } from './Client/bell/bell.component';
import { FinancialReportComponent } from './Reporting/financial-report/financial-report.component';
import { ProductReportComponent } from './Reporting/product-report/product-report.component';
import { BookingReportComponent } from './Reporting/booking-report/booking-report.component';
import { SupplierReportComponent } from './Reporting/supplier-report/supplier-report.component';
import { ViewdetailComponent } from './Supplier/sale/viewdetail/viewdetail.component';
import { SaleComponent } from './Supplier/sale/sale.component';
import { AddstockComponent } from './Supplier/stock/addstock/addstock.component';
import { EditstockComponent } from './Supplier/stock/editstock/editstock.component';
import { StocktakeComponent } from './Supplier/stock/stocktake/stocktake.component';
import { WriteoffComponent } from './Supplier/stock/writeoff/writeoff.component';
import { StockComponent } from './Supplier/stock/stock.component';
import { AddsupplierComponent } from './Supplier/supplier/addsupplier/addsupplier.component';
import { orderform } from './Supplier/supplier/placeorder/orderform/orderform.component';
import { EditsupplierComponent } from './Supplier/supplier/editsupplier/editsupplier.component';
import { PlaceorderComponent } from './Supplier/supplier/placeorder/placeorder.component';
import { SupplierComponent } from './Supplier/supplier/supplier.component';
import { ViewServicesComponent } from './Service/view-services/view-services.component';
import { ScheduleComponent } from './Booking/schedule/schedule.component';
import { AdviseComponent } from './Booking/advise/advise.component';
import { EmployeehomeComponent } from './User/employeehome/employeehome.component';
import { ReportsComponent } from './User/reports/reports.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { GetBookingsComponent } from './User/get-bookings/get-bookings.component';
//import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [

  {path: '', redirectTo: '/home',pathMatch: 'full'},
  {path: "advise", component: AdviseComponent},
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
  {path: 'ViewServices', component: ViewServicesComponent},
  {path: 'salereport', component: SalesReportComponent},
  {path: 'financialreport', component: FinancialReportComponent},
  {path: 'productreport', component: ProductReportComponent},
  {path: 'bookingreport', component: BookingReportComponent},
  {path: 'supplierreport', component: SupplierReportComponent},
  {path: 'viewdetail', component: ViewdetailComponent},
  {path: 'sale', component: SaleComponent},
  {path: 'viewdetail', component: ViewdetailComponent},
  {path: 'addstock', component: AddstockComponent},
  {path: 'editstock', component: EditstockComponent},
  {path: 'stocktake', component: StocktakeComponent},
  {path: 'writeoff', component: WriteoffComponent},
  {path: 'stock', component: StockComponent},
  {path: 'addsupplier', component: AddsupplierComponent},
  {path: 'editsupplier', component: EditsupplierComponent},
  {path: 'orderform', component: orderform},
  {path: 'placeorder', component: PlaceorderComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: 'employeehome', component: EmployeehomeComponent},
  {path: 'schedule', component: ScheduleComponent},
  { path: 'clientregister', component: ValidateComponent},
  {path: 'edit', component: EditComponent },
  {path: 'browse', component: BrowseComponent },
  {path: 'request', component: RequestbComponent },
  {path: 'basket', component: BasketComponent },
  {path: 'Booking', component: MakebookingComponent },
  {path: 'ViewBooking', component: ViewbookingComponent },
  {path: 'ServicePackage', component: ServicepComponent },
  {path: 'confirmbooking', component: BookingConfirmComponent }, 
  {path: 'ClientProfile', component: ClientprofileComponent },
  {path: 'Notification', component: BellComponent },
  {path: 'reports', component: ReportsComponent},
  {path: '403Forbidden', component: ForbiddenPageComponent},
  {path: 'getbookings', component: GetBookingsComponent},
  
  {path: '**', redirectTo: '/404Page'},
  {path: '404Page', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
