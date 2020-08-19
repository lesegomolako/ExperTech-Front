import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-delete-so',
  templateUrl: './delete-so.component.html',
  styleUrls: ['./delete-so.component.css']
})
export class DeleteSOComponent implements OnInit {

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
  }

  formData = this.service.OptionData;

  Delete(OptionID: any)
  {

    if(confirm("Are you sure you want to delete this?"))
    {
      this.service.DeleteServiceOption(OptionID).subscribe(res =>
        {
          

        })
    }
    
  }
}
