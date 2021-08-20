import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoApiService } from '../../../services/todo-api.service';
import { Tasks } from '../../../../tasks';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { FormBuilder } from '@angular/forms';
import { TodoFacadeService } from '../../../services/todo-facade.service';

@Component({
  selector: 'angular-nx-todo-add-dialog',
  templateUrl: './todo-add-dialog.component.html',
  styleUrls: ['./todo-add-dialog.component.scss'],
})
export class TodoAddDialogComponent implements OnInit {
  todoFormGroup: FormGroup;
  isTodoEdit: boolean;
  taskId: number;
  taskStatus: string;

  durationInSeconds = 2;
  constructor(
    public dialogRef: MatDialogRef<TodoAddDialogComponent>,
    private todoApiService: TodoApiService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private todoFacadeService: TodoFacadeService,
    @Inject(MAT_DIALOG_DATA) public data: { task: Tasks; edit: boolean }
  ) {}

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.buildTodoFormGroup();
    this.isTodoEdit = this.data.edit;
    if (this.isTodoEdit) {
      this.taskId = this.data.task.id;
      this.taskStatus = this.data.task.status;
      Array.from({
        //loop the dependencies array and add to form builder group and patch it
        length: this.data?.task?.dependencies.length,
      }).forEach(() => {
        this.dependencies.push(
          this.formBuilder.group({ dependency: undefined })
        );
      });
      // this.dependencies.push(this.formBuilder.group({ dependency: undefined }));
      this.todoFormGroup.patchValue(this.data.task);
    }
  }

  buildTodoFormGroup(): void {
    this.todoFormGroup = this.formBuilder.group({
      title: [undefined, Validators.required],
      description: [undefined, [Validators.required, Validators.minLength(10)]],
      startTime: undefined,
      endTime: undefined,
      dependencies: this.formBuilder.array([]),
    });
  }
  onAddDependency(): void {
    const dependencyForm = this.formBuilder.group({
      dependency: [undefined, Validators.required],
    });
    // this.dependencies.push(this.formBuilder.group({ dependency: undefined }));
    this.dependencies.push(dependencyForm);
    this.dependencies.updateValueAndValidity(); // update form values
  }
  onDeleteDependency(index: number): void {
    //remove tags
    this.dependencies.removeAt(index);
    this.dependencies.updateValueAndValidity(); // update form values
  }

  onSubmit(): void {
    if (this.todoFormGroup.valid) {
      this.todoFacadeService
        .onSubmit({ ...this.todoFormGroup.value, status: 'pending' })
        .subscribe((response) => {
          !!response && this.todoFacadeService.getTasks().subscribe(); // subscribe for changes after submit
          response && this.dialogRef.close(true);
        });
    }
  }

  onUpdate(): void {
    this.todoFacadeService
      .onUpdate(
        { ...this.todoFormGroup.value, status: this.taskStatus },
        this.taskId
      )
      .subscribe((response) => {
        console.log('this is the response ', response);
        this.todoApiService.getTasks().subscribe();
        response && this.openSnackBar();

        response && this.dialogRef.close(true);
      });
  }
  get dependencies(): FormArray {
    return this.todoFormGroup.get('dependencies') as FormArray;
  }

  get description(): FormControl {
    return this.todoFormGroup.get('description') as FormControl;
  }
  get title(): FormControl {
    return this.todoFormGroup.get('title') as FormControl;
  }

  get startTime(): FormControl {
    return this.todoFormGroup.get('startTime') as FormControl;
  }
  get endTime(): FormControl {
    return this.todoFormGroup.get('endTime') as FormControl;
  }
}
