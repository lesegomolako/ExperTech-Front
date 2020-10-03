import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeInfo } from 'src/app/Booking/makebooking/makebooking.component';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(type: EmployeeInfo[], typeid: any)
    {
       
        return  type.filter(type => type.TypeID == typeid )
    }

}
