export class ProductData {
    
    ProductID: any;
    Name: string;
    Description: string;
    QuantityOnHand: any;
    Price: any;
    SupplierID: any;
    CategoryID: any;
    Category: string;
    Supplier: string;
    SelectedQuantity:number;
    Image: any;
    Bought: boolean;

    Photos:
    [
        {
            PhotoID: any;
            Photo: any;
        }
    ]
}
