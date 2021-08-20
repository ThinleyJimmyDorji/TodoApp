import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TodoApiService } from '../../services/todo-api.service';
import { Tasks } from '../../../tasks';
import { TodoFacadeService } from '../../services/todo-facade.service';
import { Observable } from 'rxjs';
import { TodoStoreEnum } from '../../misc/todo.store';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'angular-nx-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  // task?: Tasks;
  tasks$: Observable<Tasks>;
  tags: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private todoApiService: TodoApiService,
    private todoFacadeService: TodoFacadeService
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.todoFacadeService.specificStateChange(
      TodoStoreEnum.TODO_DETAIL_DATA
    );

    this.todoFacadeService
      .specificStateChange(TodoStoreEnum.TODO_DETAIL_DATA)
      .subscribe((response) => {
        debugger;
      });
    this.getTask();
  }
  getTask() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoFacadeService.getTask(id).subscribe((res) => {
      console.log(res);
    });
  }

  goBack(): void {
    this.location.back();
  }
  changeStatus(task: Tasks): void {
    this.todoFacadeService.updateStatus(task).subscribe();
  }
}
