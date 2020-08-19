export class ServiceTypeData {
    TypeID: any;
    Name: string;
    Description: string;
}

export class ServiceData
{
    ServiceID: any;
    Name: string;
    Description: string;
    TypeID: any;
    Duration: any;

    ServiceImage:
    [
        {
            Photo: ImageBitmap;
        }
    ]

    ServicePrice:
    [
        {
            PriceID: any;
            ServiceID: any;
            OptionID: any;
            Price: number;
        }
    ]
}

export class ServiceOptionData
{
    Name: string;
    Duration:any;
}
