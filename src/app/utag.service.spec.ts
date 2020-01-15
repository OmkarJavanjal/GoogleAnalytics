/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtagService } from './utag.service';

describe('UtagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtagService]
    });
  });

  it('should ...', inject([UtagService], (service: UtagService) => {
    expect(service).toBeTruthy();
  }));
});
