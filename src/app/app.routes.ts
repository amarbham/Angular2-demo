import { Routes  } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersResolver } from './components/users/users.resolver';

export const AppRoutes: Routes  = [
  // {
  //   path: '',
  //   redirectTo: 'users',
  //   pathMatch: 'full'
  // },
  
  {
    path: '',
    component: UsersComponent,
    resolve: {
      usersData: UsersResolver
    }
  },
];