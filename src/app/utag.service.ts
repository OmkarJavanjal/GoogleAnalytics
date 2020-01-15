import { Injectable } from '@angular/core';
import { TealiumDataService } from './tealium-data.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { EnvConstants } from './env-constants';

@Injectable()
export class TealiumUtagService {
  script_src: string = '';
  script_src_sync: string = '';
  config:any;
  locationurl:Location;
  
  
  // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
  constructor(private tealiumDataSvc : TealiumDataService, private location: Location) {
   //(<any>window).utag_cfg_ovrd = { noview : true };
    (<any>window).utag_data = {};
    this.locationurl=location;
  
    
  }

  // Generic script loader with callback
  getScript( src : string, callback : Function ) {
    let d = document;
    let o = { callback: callback || function(){} };
    let s, t;

    if ( typeof src == "undefined" ) {
      return;
    }

    s = d.createElement("script");s.language="javascript";s.type="text/javascript";s.async=1;s.charset="utf-8";s.src=src;
    if ( typeof o.callback == "function" ) {
      if ( d.addEventListener ) {
        s.addEventListener("load",function(){o.callback()},false);
      } else {
        // old IE support
        s.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.callback()}};
      }
    }
    t = d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
  }

  // Config settings used to build the path to the utag.js file
  setConfig() {
     let host:string = window.location.hostname;
    let env:string = EnvConstants.DEV;

    // Determine environment based on app host name
    if(host.toLowerCase().includes(EnvConstants.QA)) {
      env = EnvConstants.QA;
    }
    /*
     else if(host.toLowerCase().includes(EnvConstants.LTI || EnvConstants.INT)) {
     env = EnvConstants.DEV;
     }

     else if(host.toLowerCase().includes(EnvConstants.PROD_QUOTE)) {
     env = EnvConstants.PROD;
     }
     */
    this.config ={ 
      account:'test-tealium-vj', 
      profile : 'abhinay-poc' ,
      environment : env,
      locationurl:this.locationurl.path()}
    if ( this.config.account !== undefined && this.config.profile !== undefined && this.config.environment !== undefined ) {
      this.script_src_sync='https://tags.tiqcdn.com/utag/' + this.config.account + '/' + this.config.profile + '/' + this.config.environment + '/utag.sync.js'
      this.script_src = 'https://tags.tiqcdn.com/utag/' + this.config.account + '/' + this.config.profile + '/' + this.config.environment + '/utag.js';
    }
  }

  // Data layer is optional set of key/value pairs
  track(tealium_event: string, data? : any) {
    if ( this.script_src === '' ) {
      console.log("Tealium config not set.");
      return;
    }
    if ( (<any>window).utag === undefined ) {
      this.getScript( this.script_src_sync, function(){});
      this.getScript( this.script_src, function(){
        (<any>window).utag.track( tealium_event, data );
      });
    } else {
      (<any>window).utag.track( tealium_event, data );
    }
  }


  view() {
    this.setConfig();
    var data = this.tealiumDataSvc.setDataLayer(this.config);
    Object.keys(data).map((key)=>{
      (<any>window).utag_data[key]=data[key]
    });
    console.log("DATA LAYER:",(<any>window).utag_data);  
   this.track("view",data);
  }
  
}


