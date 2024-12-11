import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthorComponent } from './components/admin/author/author.component';
import { BookComponent } from './components/admin/book/book.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { UserComponent } from './components/admin/user/user.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'author', component: AuthorComponent }, // Reemplazar con el componente correcto
      { path: 'book', component: BookComponent }, // Reemplazar con el componente correcto
      { path: 'category', component: CategoryComponent }, // Reemplazar con el componente correcto
      { path: 'user', component: UserComponent } // Reemplazar con el componente correcto
    ],
  },
];
