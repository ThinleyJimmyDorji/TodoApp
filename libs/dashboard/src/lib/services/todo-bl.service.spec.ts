import { TestBed } from '@angular/core/testing';

import { TodoBlService } from './todo-bl.service';

describe('TodoBlService', () => {
  let service: TodoBlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoBlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
