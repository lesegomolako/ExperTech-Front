export class SaleData
{
  SaleID: any;
  Status: string;
  Reminder: any;
  Payment: any;
  ClientID: any;
  ClientName: string;
  ClientSurname:string;
  ClientEmail: string;
  ClientContact: string;
  Date: string;
  SaleType: string;
  PaymentType: string;

  Products:
  [
    {
      Name: string;
      Price: any;
      Quantity: any;
    }
  ]
  
}

export class StockData
{
  ItemID: any;
  Name: string;
  Description: string;
  Price: string;
  QuantityInStock: any;
}

export class StockTakeData
{
  StockTakeID: any;
  AdminID: any;
  Description: string;
  Date: string;
  StockTakeLines:
  [
    {
      StockItemID: any;
      Quantity: any;
    }
  ]
}

export class WriteOffData
{
  WriteOffID: any;
  Description: string;
  Date: string;
  WriteOffLines:
  [
    {
      StockItemID: any;
      Quantity: any;
      Reason: any;
    }
  ]
}

export class SupplierData
{
  SupplierID: any;
  Name: string;
  ContactNo: string;
  Email: string;
  Address: string;
}

export class SupplierOrderData
{
  OrderID: any;
  SupplierID: any;
  Supplier: string;
  Description: string;
  Price: string;
  Date: string;
  StockItemLines:
  [
    {
      Items: string;
      Quantity: any;
      StockItemID: any;
    }
  ]
}