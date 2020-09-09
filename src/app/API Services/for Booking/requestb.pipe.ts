import {PipeTransform, Pipe} from '@angular/core'
import { Service } from '../../Booking/requestb/requestb.component';

@Pipe({
    name: 'customFilter'
})
export class customFilter implements PipeTransform
{
    transform(type: Service[], typeid: any)
    {
       
        return  type.filter(type => type.TypeID == typeid )
    }
}