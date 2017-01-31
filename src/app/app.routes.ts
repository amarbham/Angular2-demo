import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { CounterComponent } from './components/counter/counter.component';

export const AppRoutes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'contact/:id', component: UsersComponent }
];