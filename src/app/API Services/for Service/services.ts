export class ServiceTypeData {
    TypeID: any;
    Name: string;
    Services: ServiceData[];
}

export class ServiceData
{
    ServiceID?: any;
    Name: string;
    ServiceType?: string;
    TypeID: any;
    Description?: string;
    Duration: any;
    Image?: any;

    ServicePhotoes?:
    {
        PhotoID: any;
        Photo: ImageBitmap;
    }

    ServicePrices?:  
    [   
        {
            Price: number;
        }
    ]
    
    ServiceTypeOptions?:
    [   
      {
        Option: string;
        OptionID: any;
        ServicePrices:  
        [   
            {
             Price: number;
            }
        ]
      }
    ]
}

export class ServiceOptionData
{
    OptionID: any;
    Name: string;
    Duration:any;
}

export class PackageData
{
    PackageID: any;
    ServiceID: string;
    Name: string;
    Price: any;
    Quantity: any;
    Duration: any;

}
