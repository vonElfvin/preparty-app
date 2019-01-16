import { TestBed } from '@angular/core/testing';

import { ThisOrThatGameInstanceService } from './this-or-that-game-instance.service';

describe('ThisOrThatGameInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThisOrThatGameInstanceService = TestBed.get(ThisOrThatGameInstanceService);
    expect(service).toBeTruthy();
  });
});
