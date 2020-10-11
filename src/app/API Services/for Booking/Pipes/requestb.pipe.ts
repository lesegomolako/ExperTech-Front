import {PipeTransform, Pipe} from '@angular/core'
import { ServiceData } from '../../for Service/services'



@Pipe({
    name: 'customFilter'
})
export class customFilter implements PipeTransform
{
    transform(type: ServiceData[], typeid: any)
    {
        return  type.filter(type => type.TypeID == typeid )
    }
}