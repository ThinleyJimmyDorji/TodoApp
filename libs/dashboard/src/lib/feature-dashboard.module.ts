import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TodoAddComponent } from './component/todo-add/todo-add.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoAddDialogComponent } from './component/todo-add/todo-add-dialog/todo-add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDetailComponent } from './component/todo-detail/todo-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import { RxjsPracticeComponent } from './component/rxjs-practice/rxjs-practice.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSortModule,
  ],
  declarations: [
    HeaderComponent,
    TodoAddComponent,
    TodoListComponent,
    TodoAddDialogComponent,
    TodoDetailComponent,
    SnackBarComponent,
    RxjsPracticeComponent,
  ],
  exports: [
    HeaderComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoDetailComponent,
    SnackBarComponent,
  ],
})
export class FeatureDashboardModule {}
