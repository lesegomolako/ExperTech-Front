import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { Time } from '@angular/common';
import { ServiceData, ServiceTypeData } from '../for Service/services';

export class Client {
  ClientID: any;
  Name: string;
  Surname: string;
  ContactNo: string;
  Email: string;
}

export class Employee {
  EmployeeID: any;
  Name: string;
  Surname: string;
  ContactNo: string;
  Email: string;
}

export class Admin {
  AdminID?: any;
  Name: string;
  Surname: string;
  ContactNo: string;
  Email: string;
  Owner?: boolean;
  Deleted?: boolean;
}

export class User {
  UserID?: any;
  RoleID: any;
  Username?: string;
  Password?: string;
  SessionID?: string;
  Clients?: Client[];
  Employees?: Employee[];
  Admins?: Admin[];
}

export class BasketLine {
  LineID?: any;
  ProductID: any;
  BasketID?: any;
  Quantity?: any;
  Product:
    {
      ProductID: any;
      Name: string;
      Price: any;
      Description: string;
      QuantityOnHand: any;
      Photo: [{ Image: any }]
      Category: string;
    }

}
export class Product {
  ProductID: any;
  SupplierID: any;
  CategoryID: any;
  Name: string;
  Price: any;
  Description: string;
  QuantityOnHand: any;
  Photo: any;
  Category: string;
  SelectedQuantity: number
}

export class ClientPackage {
  SaleID: any;
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
    [{
      PackageID: any;
      Date: Date;
      SaleID: any;
      StatusID: any;
    }]



}
export class Schedule {
  DateID: any;
  Dates: Date;
  Times:
    [{
      TimeID: any;
      StartTime: Time;
      EndTime: Time;
    }]

}

export class Booking {
  BookingID: any;
  Status: string;
  Client: string;

  BookingLines:
    [{
      ServiceID: any;
      OptionID: any;
      Service: string;
      Option: string;
    }]
  EmployeeSchedule: [
    {
      Date: Date;
      StartTime: Time;
      EndTime: Time;
      Employee: string;
      canCancel: any;
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

export class EmployeeSchedule {
  EmployeeID: any;
  Employee: string;
  TypeID: any;
  Name: string;

  Services: ServiceData[]

  ServiceOptions: [{
    ServiceID: any;
    OptionID: any;
    Name: string;
  }]

  EmployeeSchedule: empSchedge[]
}

export interface empSchedge
{
  EmployeeID: any,
  TimeID: any,
  DateID: any,
  Date: Date,
  Time: any
}

export class AuditTrail {
  AuditID?: any;
  Name: any
  OldData: any;
  NewData: any;
  TablesAffected: string;
  TransactionType: string;
  Data: Date;
  AuthorizedBy?: any;
}

