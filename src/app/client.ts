import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { Time } from '@angular/common';

export class Client {
    ClientID: any;
    Name: string;
    Surname:string;
    ContactNo: string;
    Email: string;
}

export class User {
    UserID: any;
    RoleID: any;
    Username: string;
    Password: string;
    SessionID: string;
    Clients: 
      {

            Name: string;
            Surname: string;
            ContactNo: string;
            Email: any;



        }
    
    
}

export class BasketLine {
    LineID?: any;
    ProductID: any;
    BasketID: any;
    Quantity?: any;
    Product:
    {
        ProductID: any;
        Name: string;
        Price: any;
        Description: string;
        QuantityOnHand: any;
        Photo: any;
        Category: string;
    }
    
}
export class Product{
    ProductID: any;
    SupplierID: any;
    CategoryID: any;
    Name: string;
    Price: any;
    Description: string;
    QuantityOnHand: any;
    Photo: any;
    Category: string;
    SelectedQuantity:number
}

export class ClientPackage{
    SaleID:any;
    PackageID: any;
    Date: Date;
    ExpiryDate: Date;
    TotalAvailable: any;
    ServicePackage:
    {
        PackageID: any;
        Quantity: any;
        Name: string;
    }
    PackageInsatance:
    {
        PackageID: any;
        Date: Date;
        SaleID: any;
        StatusID: any;
    }
    InstanceStatu:
    {

        Status: string;
    }


}
export class Schedule
{
    DateID: any;
    Dates: Date;
    Times:
    [{
        TimeID: any;
        StartTime: Time;
        EndTime: Time;
    }]

}

export class Booking
{
  BookingID: any;
  Status: string;
  ClientID = 2;
  BookingLines:
    [{
      ServiceID: any;
      OptionID: any;
      Service: string;
    }]
    EmployeeSchedule: [
      {
          Date: Date;
          StartTime: Time;
          EndTime: Time;
          Employee: string;
      }
  ]
  

  DateRequesteds:
    [{
      Date: Date;
      StartTime: any;
    }]
  

  BookingNotes:  
    [{
      Notes: string;
    }]
  
}



