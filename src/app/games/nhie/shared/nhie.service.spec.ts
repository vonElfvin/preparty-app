import { TestBed } from '@angular/core/testing';

import { NhieGameInstanceService } from './nhieGameInstance.service';

describe('NhieGameInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhieGameInstanceService = TestBed.get(NhieGameInstanceService);
    expect(service).toBeTruthy();
  });
});
