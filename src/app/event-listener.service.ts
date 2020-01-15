import { Injectable } from '@angular/core';
import { TealiumDataService } from './tealium-data.service';


@Injectable()
export class EventListenerService {
  localName: any;

  constructor(private tealiumdatasvc: TealiumDataService) {
    (<any>window).addEventListener('change', this.trackEvent.bind(this));
    (<any>window).addEventListener('mousedown', this.trackEvent.bind(this));
  }

  //Setting up event data object based on type of event
  trackEvent(event) {
    var eventID = '';
    var eventvalue = '';
    if ((!event.target.attributes['data-dl'])) {
      try {
        var element = event.target;
        var elemType = event.srcElement.localName;
        
        if ((event.type == 'mousedown' && (elemType == 'a' || elemType == 'button')) || (event.type == 'change')) {
         
          if (elemType === "input" && element.type!='text') {
            elemType = 'Input Field Click - (' + element.type + ')';
            eventID = element.id;
            eventvalue = element.value;
          }

          if (elemType === "a") {
            elemType = "Link Click";
            eventID = element.innerText;
            eventvalue = element.href;
          }
          if (elemType === "button") {
            elemType = "Button Click";
            eventID = element.id;
            eventvalue = element.innerText;

          }
          if (elemType === "select") {
            elemType = 'Select Click - (' + element.type + ')';
            eventID = element.id;
            if (element.type == "select-multiple") {
              for (var i = 0; i < element.options.length; i++) {
                if (element.options[i].selected) {
                  eventvalue += element.options[i].innerText + '|';
                }
              }
            }
            else
              eventvalue = (element.options[element.selectedIndex]).innerText;

          }
          var data = {
            event_parent: "Page Tag",
            event_type: elemType,
            event_id: eventID,
            event_value: eventvalue,
          };
          if (element.type!='text')
            this.tealiumdatasvc._appTrack(data, element, null);
        }


      }
      catch (e) {
        console.log("Tealium error : ", e.message);
      }
    }



  }
}
