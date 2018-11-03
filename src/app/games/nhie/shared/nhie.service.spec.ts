import { TestBed } from '@angular/core/testing';

import { NhieService } from './nhie.service';

describe('NhieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhieService = TestBed.get(NhieService);
    expect(service).toBeTruthy();
  });
});
