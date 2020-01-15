import { Injectable } from '@angular/core';
import { TealiumDataService } from './tealium-data.service';  

@Injectable()
export class CustomEventService {
events=[];
  formSuccess() {
  
    //Custom event based on element interaction
    this.tealiumdatasvc.addEvent({
      "event_name":"Form submit",
      "event_parent":"custom form event",
      "event_type": "custom button"
    });
  }
  constructor(private tealiumdatasvc : TealiumDataService){}

  //Page level custom events
  pageSuccessEvent(){
      this.tealiumdatasvc.addPageLevelEvent({
        "event_parent" : "Page Tag",
        "event_type" : "Custom page events1",
        "event_name": "Form Success",
        "da_track": "true"
      });
  }
   pageSuccessEvent2(){
      this.tealiumdatasvc.addPageLevelEvent({
        "event_parent" : "Page Tag",
        "event_type" : "Custom page events2",
        "event_name": "Form Success2",
        "da_track": "true"
      });
  }
   pageSuccessEvent3(){
      this.tealiumdatasvc.addPageLevelEvent({
        "event_parent" : "Page Tag",
        "event_type" : "Custom page events3",
        "event_name": "Form Success3"
      });
  }
}
