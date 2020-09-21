import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/Booking/makebooking/makebooking.component';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(type: Employee[], typeid: any)
    {
       
        return  type.filter(type => type.TypeID == typeid )
    }

}
