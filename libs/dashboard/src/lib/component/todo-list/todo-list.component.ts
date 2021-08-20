import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoApiService } from '../../services/todo-api.service';
import { Tasks } from '../../../tasks';
import { Router } from '@angular/router';
import { TodoAddDialogComponent } from '../todo-add/todo-add-dialog/todo-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TodoFacadeService } from '../../services/todo-facade.service';
import { TodoStoreEnum } from '../../misc/todo.store';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'angular-nx-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoEdited?: boolean;
  dataSource = new MatTableDataSource<Tasks[]>([]);
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'title',
    'startTime',
    'endTime',
    'status',
    'menuButton',
  ];

  constructor(
    private todoApiService: TodoApiService,
    private router: Router,
    private dialog: MatDialog,
    private todoFacadeService: TodoFacadeService
  ) {}

  ngOnInit(): void {
    this.todoFacadeService
      .specificStateChange(TodoStoreEnum.TODOLIST)
      .subscribe((res) => {
        // @ts-ignore
        this.dataSource = new MatTableDataSource(res as Tasks[]);
        console.log('sort:', this.sort);
        this.dataSource.sort = this.sort;
      });
    this.getTasks();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngOnInit(): void {
  //   this.getTasks();
  //   this.todoApiService.getTodoObs().subscribe((todo) => {
  //     debugger;
  //     this.dataSource = todo;
  //   });
  // }

  // reFetch(shouldFetchAgain: boolean): void {
  //   // debugger;
  //   if (shouldFetchAgain) this.getTasks();
  // }

  // getTasks(): void {
  //   this.todoApiService.getTasks().subscribe();
  // }
  getTasks(): void {
    this.todoFacadeService.getTasks().subscribe();
  }
  // addItemToDataSource(payload: any) {
  //   this.dataSource.push(payload);
  // }

  todoDetail(id: number) {
    debugger;
    this.router.navigate([id]);
  }

  onDelete(element: Tasks): void {
    console.log(element);
    this.todoFacadeService.onDelete(element).subscribe((res) => {
      !!res && this.getTasks();
      console.log('this is the res', typeof res); //update the store after the item is deleted
    });
  }
  onEdit(task?: Tasks) {
    const dialogRef = this.dialog.open(TodoAddDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: {
        edit: true,
        task: task,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe((response) => {
        // debugger;
        // this.todoEdited = true;
        // this.reFetch(this.todoEdited);
        // console.log(this.todoEdited);
        this.getTasks();
      });
  }
}
