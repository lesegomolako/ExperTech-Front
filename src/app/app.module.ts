import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { EditSTComponent } from './edit-st/edit-st.component';
import { ServicesComponent } from './services/services.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TServicesComponent } from './tservices/tservices.component';
import { ServiceOptionsComponent } from './service-options/service-options.component';
import { ServicePackagesComponent } from './service-packages/service-packages.component';
import { ClientMenuComponent } from './client-menu/client-menu.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditSOComponent } from './edit-so/edit-so.component';
import { EditSPComponent } from './edit-sp/edit-sp.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductComponent } from './product/product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';
import { DeleteServiceTypeComponent } from './delete-service-type/delete-service-type.component';
import { DeleteSOComponent } from './delete-so/delete-so.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from './services.service';
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

@NgModule({
  declarations: [
    AppComponent,
    ServiceTypeComponent,
    EditSTComponent,
    ServicesComponent,
    TServicesComponent,
    ServiceOptionsComponent,
    ServicePackagesComponent,
    ClientMenuComponent,
    EditServiceComponent,
    EditSOComponent,
    EditSPComponent,
    EditProductComponent,
    ProductComponent,
    DeleteProductComponent,
    DeleteServiceComponent,
    DeleteServiceTypeComponent,
    DeleteSOComponent,
    LoginComponent,
    AdminComponent,
    AvailableComponent,
    CbookingComponent,
    ClientComponent,
    ConfirmComponent,
    EmployeeComponent,
    ForgotComponent,
    PaymentsComponent,
    PickupComponent,
    RegisterComponent,
    SetupComponent,
    SpackageComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSelectModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSidenavModule,
    HttpClientModule,
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
