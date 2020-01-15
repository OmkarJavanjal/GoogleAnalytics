import { Directive } from '@angular/core';
import { TealiumDataService } from './tealium-data.service';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[data-dl]',
})
export class LinkDirective {
  eventInfo : ElementRef;

  constructor(private tealiumdatasvc: TealiumDataService, el: ElementRef) {
    this.eventInfo = el;
  }
  //Setting up event data based on types of events
  trackEvent(elementAttrs, event) {
    var eventID = '';
    var eventvalue = '';
    try {
      var element = event.target;
      var elemType = event.srcElement.localName;
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
        this.tealiumdatasvc._appTrack(data, element, elementAttrs);

    }
    catch (e) {
      console.log("Tealium error : ", e.message);
    }

  }

  ngAfterViewInit() {
    //Capturing data-dl  event value
    var dl_eventValue = JSON.parse(this.eventInfo.nativeElement.attributes['data-dl'].nodeValue).event;
    //adding event listener to handle automatic events with data-dl
    this.eventInfo.nativeElement.addEventListener(dl_eventValue, this.onEventDetect.bind(this));
  }

  onEventDetect(event) {
    var dataAttr = JSON.parse(event.srcElement.attributes['data-dl'].nodeValue);
    if (dataAttr.event) {
      this.trackEvent(dataAttr, event);
    }
  }
}




