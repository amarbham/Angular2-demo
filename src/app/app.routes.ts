import { Routes  } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

export const AppRoutes: Routes  = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent
  },
];