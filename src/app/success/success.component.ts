import { Component, OnInit } from '@angular/core';
import { CustomEventService } from '../custom-event.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {
  success : any;
  constructor(private custom:CustomEventService) { }

  ngOnInit() {
    this.success="success"; 

    //Case of a custom event to call a suceess event when the variable is set to required value
    if(this.success==="success"){
      this.custom.pageSuccessEvent();
      this.custom.pageSuccessEvent2();
      this.custom.pageSuccessEvent3();
    }
  }

 
}
