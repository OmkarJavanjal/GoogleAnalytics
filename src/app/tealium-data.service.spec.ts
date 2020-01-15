/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TealiumDataService } from './tealium-data.service';

describe('TealiumDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TealiumDataService]
    });
  });

  it('should ...', inject([TealiumDataService], (service: TealiumDataService) => {
    expect(service).toBeTruthy();
  }));
});
