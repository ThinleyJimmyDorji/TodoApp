import { TestBed } from '@angular/core/testing';

import { BaseFacadeService } from './base-facade.service';

describe('BaseFacadeService', () => {
  let service: BaseFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
