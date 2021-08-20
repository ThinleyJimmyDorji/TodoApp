import { Injectable } from '@angular/core';
import { INITIAL_TODO_STATE, TodoStoreState } from '../misc/todo.store';
import { BaseStateService } from './base/base-state.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService extends BaseStateService<TodoStoreState> {
  constructor() {
    super();
    this.setState(INITIAL_TODO_STATE, 'Initial state');
  }
}
