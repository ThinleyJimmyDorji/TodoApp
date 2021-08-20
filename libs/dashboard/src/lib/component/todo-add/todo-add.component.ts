import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoAddDialogComponent } from './todo-add-dialog/todo-add-dialog.component';

export interface DialogData {
  id?: number;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
}
@Component({
  selector: 'angular-nx-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit {
  @Output() addTodo: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoAddDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      // debugger;
      this.addTodo.emit(true);
    });
  }
}
