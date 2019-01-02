import { TestBed } from '@angular/core/testing';

import { VotingGameInstanceService } from './voting-game-instance.service';

describe('VotingGameInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotingGameInstanceService = TestBed.get(VotingGameInstanceService);
    expect(service).toBeTruthy();
  });
});
