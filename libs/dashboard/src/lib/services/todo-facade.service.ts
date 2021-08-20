import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TodoStoreEnum, TodoStoreState } from '../misc/todo.store';
import { BaseFacadeService } from './base/base-facade.service';
import { TodoApiService } from './todo-api.service';
import { TodoStateService } from './todo-state.service';
import { Tasks } from '../../tasks';

@Injectable({
  providedIn: 'root',
})
export class TodoFacadeService extends BaseFacadeService<
  TodoStateService,
  TodoStoreState
> {
  constructor(
    private todoStateService: TodoStateService,
    private todoApiService: TodoApiService
  ) {
    super(todoStateService);
  }
  //get all the tasks
  getTasks(): Observable<boolean> {
    return this.todoApiService.getTasks().pipe(
      tap((res) => this.updateSpecificState(res, TodoStoreEnum.TODOLIST)),
      map(() => true)
    );
  }
  // get a task detail
  getTask(id: number): Observable<boolean> {
    return this.todoApiService.getTask(id).pipe(
      tap((res) =>
        this.updateSpecificState(res, TodoStoreEnum.TODO_DETAIL_DATA)
      ),
      map(() => true)
    );
  }
  // add a task
  onSubmit(task: Tasks): Observable<boolean> {
    return this.todoApiService.onSubmit(task).pipe(map(() => true));
  }
  //update a task
  onUpdate(task: Tasks, taskId: number): Observable<boolean> {
    return this.todoApiService.onUpdate(task, taskId).pipe(map(() => true));
  }
  //delete a task
  onDelete(task: Tasks): Observable<boolean> {
    return this.todoApiService.onDelete(task).pipe(map(() => true));
  }
  // update task status pending/completed
  updateStatus(task: Tasks): Observable<boolean> {
    return this.todoApiService.updateStatus(task).pipe(
      tap((res) =>
        this.updateSpecificState(res, TodoStoreEnum.TODO_DETAIL_DATA)
      ),
      map(() => true)
    );
  }
}
