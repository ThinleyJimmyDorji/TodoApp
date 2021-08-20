import { Tasks } from '../../tasks';

export interface TodoStoreState {
  todoList: Tasks[];
}
export interface TodoDetailData{
  currentTask: Tasks;
}

export enum TodoStoreEnum {
  TODOLIST = 'todoList',
  TODO_DETAIL_DATA = 'currentTask'
}

export const INITIAL_TODO_STATE: TodoStoreState = {
  todoList: undefined,
};
export const INITIAL_TASK_DETAILS: TodoDetailData = {
  currentTask: undefined
};
