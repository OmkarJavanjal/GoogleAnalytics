import { TestBed, inject } from '@angular/core/testing';

import { EventListenerService } from './event-listener.service';

describe('EventListenerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventListenerService]
    });
  });

  it('should be created', inject([EventListenerService], (service: EventListenerService) => {
    expect(service).toBeTruthy();
  }));
});
