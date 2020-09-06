import { Time } from '@angular/common';

export class Process {
    AdminID: any;
    Name: string;
    Surname: string;
    ContactNo: any;
    Email: string;
    EmployeeID: any;
    UserID: any;
    ClientID: any;
    Username: string;
    Password: string;
    Times: {
        StartTime: Time;
        EndTime: Time;
    };
    Dates: {
        StartDate: Date;
        EndDate: Date;
    };
    Reminder: string;
    Quantity: any;
    Payment: any;
    Description: string;
    PackageID: any;
    ServiceID: any;
    Type: string;
    StatusID: any;
    TypeID: any;
    SessionID: any;
    InfoID: any;
    Address: string;
}

export class Schedule
{
    DateID: any;
    Date: any;
    TimeID: any;
    StartTime: any;
    EndTime: any;
    Times:
    [
        {
            TimeID : any;
            StartTime: any;
            EndTime: any;
        }
    ]
}

export class Package
{
    PackageID: any;
    ServiceID: any;
    Name: string;
    Price: any;
    Quantity: any;
    Duration: any;
    ClientPackage: [];
    Service: string;
}
export class PaymentType
{
    PaymentTypeID: any;
    Type: string;
}
export class Sale {}