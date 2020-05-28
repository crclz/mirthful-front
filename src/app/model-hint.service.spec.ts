import { TestBed } from '@angular/core/testing';

import { ModelHintService } from './model-hint.service';

describe('ModelHintService', () => {
  let service: ModelHintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelHintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
