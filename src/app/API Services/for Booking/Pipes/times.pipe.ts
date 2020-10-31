import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'timeFilter'
})
export class TimePipe implements PipeTransform {

  transform(type: any[], selectDate:any, today:any,  time: any)
    {

      if(selectDate == today)
      {
        return  type?.filter(type => type.StartTime > time )
      }
      else
      {
        return type
      }
        
    }

}
