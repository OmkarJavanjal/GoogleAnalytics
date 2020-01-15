/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomEventService } from './custom-event.service';

describe('CustomEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomEventService]
    });
  });

  it('should ...', inject([CustomEventService], (service: CustomEventService) => {
    expect(service).toBeTruthy();
  }));
});
