export class ServiceTypeData {
    TypeID: any;
    Name: string;
    Description: string;
}

export class ServiceData
{
    ServiceID: any;
    Name: string;
    ServiceType: string;
    TypeID: any;
    Description: string;
    Duration: any;

    ServiceImage:
    {
        Photo: ImageBitmap;
    }

    ServicePrices:  
    [   
        {
            Price: number;
        }
    ]
    
    ServiceTypeOptions:
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
    Service: string;
    Name: string;
    Price: any;
    Quantity: any;

}
