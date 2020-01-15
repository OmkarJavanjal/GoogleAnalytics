import { Component, OnInit } from '@angular/core';
import { EventListenerService } from '../event-listener.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent implements OnInit {

  constructor(private eventlistener: EventListenerService) { }

  ngOnInit() {
  }

}
