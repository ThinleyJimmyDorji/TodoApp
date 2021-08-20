import { TestBed } from '@angular/core/testing';

import { BaseStateService } from './base-state.service';

describe('BaseStateService', () => {
  let service: BaseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
