import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HomeResolver } from './components/home/home.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { message: HomeResolver }
  },
];
