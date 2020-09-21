import { Pipe, PipeTransform } from '@angular/core';
import { ServiceOption } from '../../../Booking/requestb/requestb.component';

@Pipe({
  name: 'optionsFilter'
})
export class OptionsFilterPipe implements PipeTransform {

  transform(type: ServiceOption[], serviceid: any)
    {      
        return  type.filter(type => type.ServiceID == serviceid )
    }

}
