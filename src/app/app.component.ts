import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent implements OnInit {
  title = 'Testing App';

  constructor() {  }

  ngOnInit() {
   // The tealium.view function will call the tealium.track function with 'view' as first param
    // Most tags support the 'view' event and many analytics tags also support the 'link' event
   // this.tealium.view();
  //   this.tealium.link({});
  }
  // TODO: Add function that will fire for mousedown on specifically tagged items
  }
