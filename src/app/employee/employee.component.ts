import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceData } from '../services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor() { }
  List: Observable<ServiceData[]>;

  ngOnInit(): void {
  }
  
  myFunction(event: any) {
    //declare variables

    var input, filter, table, tr, td, r, txtValue, th;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    th = table.getElementsByTagName('th');

    //loop through all table rows and hide those who dont match search query
    for (r = 0; r < tr.length; r++) {
      tr[r].style.display = 'none';

      for (var k = 0; k < tr.length; k++) {
        td = tr[r].getElementsByTagName('td')[k];

        if (td) {
          txtValue = td.textContent || td.innerText;
          if (
            txtValue.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) >
            -1
          ) {
            tr[r].style.display = '';
            break;
          }
        }
      }
    }
  }
  

}
