//******************************* Angular materials *************************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {PortalModule} from '@angular/cdk/portal';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceTypeComponent } from './Service/service-type/service-type.component';
import { EditSTComponent } from './Service/edit-st/edit-st.component';
import { ServicesComponent } from './Service/services/services.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ToastrModule } from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//******************************* Components *************************************/
import { TServicesComponent } from './Service/tservices/tservices.component';
import { ServiceOptionsComponent } from './Service/service-options/service-options.component';
import { ServicePackagesComponent } from './Service/service-packages/service-packages.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { EditServiceComponent } from './Service/edit-service/edit-service.component';
import { EditSOComponent } from './Service/edit-so/edit-so.component';
import { EditSPComponent } from './Service/edit-sp/edit-sp.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductComponent } from './Product/product/product.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { DeleteServiceComponent } from './Service/delete-service/delete-service.component';
import { DeleteServiceTypeComponent } from './Service/delete-service-type/delete-service-type.component';
import { DeleteSOComponent } from './Service/delete-so/delete-so.component';
import { LoginComponent } from './User/login/login.component';
import { ForgotComponent} from './User/forgot/forgot.component';
import { ResetPasswordComponent} from './User/reset-password/reset-password.component';
import { AdminRegisterComponent} from './Staff/admin-register/admin-register.component';
import { EmployeeRegisterComponent} from './Staff/employee-register/employee-register.component';
import { SetupComponent} from './Staff/setup/setup.component';
import {AdminComponent} from './User/admin/admin.component';
import {AvailableComponent} from './User/available/available.component';
import {ClientComponent} from './User/client/client.component';

import {EmployeeComponent} from './Staff/employee/employee.component';
import {EmployeeSTComponent} from './User/employee-st/employee-st.component';
import {PaymentComponent} from './User/payment/payment.component';
import {PickupComponent} from './User/pickup/pickup.component';

import {SpackageComponent} from './User/spackage/spackage.component';
import { SalesReportComponent } from './Reporting/sales-report/sales-report.component';
import { ReportsService } from './API Services/for Reports/reports.service';
import { FinancialReportComponent } from './Reporting/financial-report/financial-report.component';
import { ProductReportComponent } from './Reporting/product-report/product-report.component';
import { SupplierReportComponent } from './Reporting/supplier-report/supplier-report.component';
import { BookingReportComponent } from './Reporting/booking-report/booking-report.component';
import { ValidateComponent } from './components/TextBoxValidator/validate/validate.component';
import { EditComponent } from './Client/edit/edit.component';
import { BellComponent } from './Client/bell/bell.component';
import { ClientprofileComponent } from './Client/clientprofile/clientprofile.component';
import { AddClientDialog,SearchClientDialog, MakebookingComponent } from './Booking/makebooking/makebooking.component';
import { ViewbookingComponent } from './Client/viewbooking/viewbooking.component';
import { ServicepComponent } from './Client/servicep/servicep.component';
import { BookingConfirmComponent } from './Booking/confirm/confirm.component';
import { BasketComponent } from './Client/basket/basket.component';
import { RequestbComponent } from './Booking/requestb/requestb.component';
import {EmployeehomeComponent} from './User/employeehome/employeehome.component';
import { BrowseComponent } from './product/browse/browse.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ViewdetailComponent} from './Supplier/sale/viewdetail/viewdetail.component';
import {SaleComponent} from './Supplier/sale/sale.component';
import {AddstockComponent} from './Supplier/stock/addstock/addstock.component';
import {EditstockComponent} from './Supplier/stock/editstock/editstock.component';
import {StocktakeComponent} from './Supplier/stock/stocktake/stocktake.component';
import {WriteoffComponent} from './Supplier/stock/writeoff/writeoff.component';
import {StockComponent} from './Supplier/stock/stock.component';
import {AddsupplierComponent} from './Supplier/supplier/addsupplier/addsupplier.component';
import {EditsupplierComponent} from './Supplier/supplier/editsupplier/editsupplier.component';
import {PlaceorderComponent,OrderDialog,ReceiveDialog} from './Supplier/supplier/placeorder/placeorder.component';
import {orderform} from './Supplier/supplier/placeorder/orderform/orderform.component';
import {SupplierComponent} from './Supplier/supplier/supplier.component';
import { ViewServicesComponent } from './Service/view-services/view-services.component';
import { SaleinvoiceComponent } from './Supplier/sale/saleinvoice/saleinvoice.component';


//******************************* Services *************************************/

import { ServicesService }  from './API Services/for Service/services.service';
import {ProductService} from './API Services/for Product/product.service';
import { SaleService } from './API Services/for Supplier/sale.service';
import { StockService } from './API Services/for Supplier/stock.service';
import { SupplierService } from './API Services/for Supplier/supplier.service';


import { ClickSpinDirective } from './click-spin.directive';
import { from } from 'rxjs';

import {ExperTexhService} from "./API Services/for Booking/exper-texh.service";
import {OptionsFilterPipe} from "./API Services/for Booking/Pipes/options-filter.pipe";
import { customFilter } from './API Services/for Booking/Pipes/requestb.pipe';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleComponent, BookingDialog} from './Booking/schedule/schedule.component';
import { AdviseComponent } from './Booking/advise/advise.component';
import { ReportsComponent } from './User/reports/reports.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EmployeePipe } from './API Services/for Booking/Pipes/employee.pipe';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { GetBookingsComponent, CbookingDialog } from './Staff/get-bookings/get-bookings.component';
import { StaffComponent } from './Staff/staff/staff.component';

import { CompanySettingsComponent } from './User/company-settings/company-settings.component';
import { SalePaymentComponent } from './User/sale-payment/sale-payment.component';
import { ChangePasswordComponent } from './User/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent, ServiceTypeComponent,EditSTComponent,ServicesComponent,TServicesComponent,
    ServiceOptionsComponent,ServicePackagesComponent,ClientMenuComponent,EditServiceComponent,
    EditSOComponent, EditSPComponent, EditProductComponent, ProductComponent, DeleteProductComponent,
    DeleteServiceComponent,DeleteServiceTypeComponent,DeleteSOComponent,LoginComponent,ForgotComponent,
    AdminRegisterComponent,SetupComponent,ResetPasswordComponent,ClickSpinDirective,PickupComponent,PaymentComponent,
    EmployeeSTComponent,EmployeeComponent,ClientComponent,CbookingDialog,
    AvailableComponent,AdminComponent,SpackageComponent,SalesReportComponent,
    FinancialReportComponent,ProductReportComponent,SupplierReportComponent, EmployeeRegisterComponent,
    BookingReportComponent,ValidateComponent,EditComponent,BellComponent,ClientprofileComponent,
    MakebookingComponent,ViewbookingComponent,ServicepComponent,BasketComponent, BookingDialog,OrderDialog,
    RequestbComponent,BrowseComponent,BookingConfirmComponent, OptionsFilterPipe, AddClientDialog, SearchClientDialog,
    customFilter,SupplierComponent,orderform,PlaceorderComponent,EditsupplierComponent,AddsupplierComponent,
    StockComponent,WriteoffComponent,StocktakeComponent,EditstockComponent,AddstockComponent,SaleComponent,
    ViewdetailComponent,SaleinvoiceComponent,ViewServicesComponent, ScheduleComponent, AdviseComponent, EmployeehomeComponent,
    ReportsComponent, ErrorPageComponent, ReceiveDialog,
    EmployeePipe, ForbiddenPageComponent, GetBookingsComponent, StaffComponent, CompanySettingsComponent, SalePaymentComponent, ChangePasswordComponent

  ],
  imports: [
    BrowserModule, MatTableModule, MatSelectModule,
    AppRoutingModule, MatButtonModule, MatAutocompleteModule, MatStepperModule,
    BrowserAnimationsModule, MatInputModule,MatExpansionModule, MatCheckboxModule,
    MatIconModule, FormsModule, ReactiveFormsModule, MatGridListModule,
    MatToolbarModule, MatMenuModule , MatFormFieldModule, MatSidenavModule, ToastrModule.forRoot(),
    HttpClientModule, MatDialogModule, PortalModule, MatPaginatorModule,MatSnackBarModule,
    FormsModule,MatBadgeModule, MatRadioModule,MatButtonToggleModule,MatCardModule,
    ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }), NgbModule
  ],
  providers: [ServicesService,SaleService,StockService,SupplierService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ExperTexhService, ProductService, ReportsService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
    
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  entryComponents: [
    AddClientDialog, SearchClientDialog, CbookingDialog, BookingDialog, OrderDialog, ReceiveDialog
  ],
})
export class AppModule { }
