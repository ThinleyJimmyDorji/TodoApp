import { TodoDetailComponent, TodoListComponent } from '@angular-nx/dashboard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: ':id',
    component: TodoDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
