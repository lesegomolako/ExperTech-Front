//******************************* Angular materials *************************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceTypeComponent } from './Service/service-type/service-type.component';
import { EditSTComponent } from './Service/edit-st/edit-st.component';
import { ServicesComponent } from './Service/services/services.component';
import { MatDialogModule } from '@angular/material/dialog';
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
import { FpasswordComponent} from './User/fpassword/fpassword.component';
import { RegisterComponent} from './User/register/register.component';
import { SetupComponent} from './User/setup/setup.component';

//******************************* Services *************************************/

import { ServicesService }  from './API Services/for Service/services.service';
import {ProductService} from './API Services/for Product/product.service'


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
    ForgotComponent,
    RegisterComponent,
    SetupComponent,
    FpasswordComponent

  ],
  imports: [
    BrowserModule, MatTableModule, MatSelectModule,
    AppRoutingModule, MatButtonModule,
    BrowserAnimationsModule, MatInputModule,
    MatIconModule, FormsModule, ReactiveFormsModule,
    MatToolbarModule, MatMenuModule , MatFormFieldModule, MatSidenavModule,
    HttpClientModule, MatDialogModule, 
    FormsModule,
    ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers: [ServicesService, ProductService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
