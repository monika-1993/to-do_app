import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SubTaskComponent } from './components/sub-task/sub-task.component';
import { HomeResolver } from './components/home/home.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'id/all',
    pathMatch: 'full'
  },
  {
    path: 'id/:id',
    component: HomeComponent,
    resolve: { message: HomeResolver },
  }

];
