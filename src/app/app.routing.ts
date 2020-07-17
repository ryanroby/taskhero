import { NotFoundComponent } from './components/404-component/404.component';
import { DeletedComponent } from './components/deleted-component/deleted.component';
import { CompletedComponent } from './components/completed-component/completed.component';
import { TasksComponent } from './components/tasks-component/tasks.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  { path: 'tasks', component: TasksComponent },
  { path: 'completed', component: CompletedComponent },
  { path: 'deleted', component: DeletedComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
