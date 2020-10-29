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
  Price: any;
  QuantityInStock: any;
  Color?: string;
  CategoryID: any;
  Category: string;
  Size: any;
}

export class StockCategory
{
  CategoryID: any;
  Name: string;
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
  OrderID?: any;
  SupplierID: any;
  Supplier?: string;
  Description?: string;
  Price?: any;
  Date?: string;
  Received?: boolean;
  StockItemLines: StockItemLines[]
}

export interface StockItemLines
{
  LineID?: any;
  Items?: string;
  Quantity: any;
  Price?: any;
  ItemID: any;
  Size?: any;
  Received?: boolean;
  QuantityReceived?: any;
}