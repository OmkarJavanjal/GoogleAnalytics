import { Injectable } from '@angular/core';


@Injectable()
export class TealiumDataService {
  events=[];
 
  udo={};
 setDataLayer(config) {
    let view_id = config.locationurl;
    let pageName: string = '';
    if (view_id) {
      pageName = view_id.split('/').pop();
    }

    // will become new udo object
    this.udo = {
      //"da_track": "true",
      "page_category": "pageview",
      "page_name": pageName,
      "page_type": pageName,
      "site_section": "contactInfo",
      "view_id": view_id,
      "zip_code": "00001",
      "state": "CT",
      "original_qcn": "",
      "qcn": "",
      "market_segment": "",
      "rate_plan": "",
     "events":this.events
    };
	this.events=[];
	return this.udo;

  }

   addPageLevelEvent(event){
       this.events.push(event);
    }

    addEvent(event){
    this.udo['events'].push(event);
    var elementvars={
      "da_track":"true"
    }
    var elementAttrs=JSON.parse(JSON.stringify(elementvars));
    this._appTrack(this.udo,null,elementAttrs);
  }

  _appTrack(data,element,elementAttrs){
    try{
      //Handle automatic events without data-dl
      if(elementAttrs==null){
          if(typeof (<any>window)._trackEvents==='function'){
              (<any>window)._trackEvents(data,element);
          }
      }
       //Handle automatic events with data-dl
      else{
      if(typeof (<any>window)._trackAnalytics==='function'){
          (<any>window)._trackAnalytics(data,element,elementAttrs);
      }
      }
    }
    catch(e){
        console.log("Tealium error : ",e.message);
    }
  }
  constructor() { }
  
}
