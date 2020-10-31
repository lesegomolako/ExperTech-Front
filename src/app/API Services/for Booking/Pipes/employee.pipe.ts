import { Pipe, PipeTransform } from '@angular/core';
import{EmployeeSchedule} from '../client';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeePipe implements PipeTransform {

  transform(type: EmployeeSchedule[], typeid: any)
    {
       
        return  type?.filter(type => type.TypeID == typeid )
    }

}
