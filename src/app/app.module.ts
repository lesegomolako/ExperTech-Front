import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { EditSTComponent } from './edit-st/edit-st.component';
import { ServicesComponent } from './services/services.component';
//import { MatDialogModule } from '@angular/material/dialog';

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
import { ValidateComponent } from './Client/components/TextBoxValidator/validate/validate.component';
import { EditComponent } from './Client/edit/edit.component';
import { BrowseComponent } from './Client/browse/browse.component';
import { RequestbComponent } from './Client/requestb/requestb.component';
import { ScheduleComponent } from './booking/schedule/schedule.component';
import { BasketComponent } from './Client/basket/basket.component';
import { MakebookingComponent } from './booking/makebooking/makebooking.component';
import { ViewbookingComponent } from './booking/viewbooking/viewbooking.component';
import { ServicepComponent } from './Client/servicep/servicep.component';
import { ConfirmComponent } from './booking/confirm/confirm.component';
import { AdviseComponent } from './booking/advise/advise.component';


import {HttpClientModule} from '@angular/common/http';
import { ServicesService }  from './services.service';
import { LoginComponent } from './login/login.component';



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
    ValidateComponent,
    EditComponent,
    BrowseComponent,
    RequestbComponent,
    ScheduleComponent,
    BasketComponent,
    MakebookingComponent,
    ViewbookingComponent,
    ServicepComponent,
    ConfirmComponent,
    AdviseComponent,
  ],
  imports: [
    BrowserModule, MatTableModule, MatSelectModule,
    AppRoutingModule, MatButtonModule,
    BrowserAnimationsModule, MatInputModule,
    MatIconModule, FormsModule, ReactiveFormsModule,
    MatToolbarModule, MatMenuModule , MatFormFieldModule, MatSidenavModule,
    HttpClientModule
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
