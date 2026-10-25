import { Routes } from '@angular/router';
import { Status } from './pages/status/status';

export const routes: Routes = [
  { path: '', redirectTo: 'status', pathMatch: 'full' },
  { path: 'status', component: Status },
];
