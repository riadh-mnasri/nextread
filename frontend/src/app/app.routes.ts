import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'books', component: BookListComponent },
  { path: '**', redirectTo: '' }
];
