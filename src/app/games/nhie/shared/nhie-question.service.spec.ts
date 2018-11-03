import { TestBed } from '@angular/core/testing';

import { NhieQuestionService } from './nhie-question.service';

describe('NhieQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhieQuestionService = TestBed.get(NhieQuestionService);
    expect(service).toBeTruthy();
  });
});
