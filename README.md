# Frontend Proyecto final "Librería Virtual"

## Objetivo del proyecto
El propósito de este repositorio del proyecto final es desarrollar el frontend de la aplicación con Angular que permita a los usuarios iniciar sesión . Tras tras la autenticación, se visualiza una lista de libros. Para la construcción del proyecto, se utilizan componentes y servicios de Angular Material para la creación de una interfaz moderna y funcional.

## Requisitos Previos
#### Conocimientos básicos en Angular, TypeScript y HTML.
#### Tener instalado Angular CLI (npm install -g @angular/cli).
#### Entorno de desarrollo configurado con Node.js y npm.
#### Instalación de Angular Material (ng add @angular/material).

## Parte 1: Configuración del Proyecto Angular
Crear un nuevo proyecto en Angular ejecutando el siguiente comando:
```bash
ng new nombreProyecto
cd nombreProyecto
```

Aceptar las configuraciones predeterminadas.

Instalar Angular Material para los componentes de la interfaz:

```bash
ng add @angular/material
```

## Parte 2: Creación de Servicios para Consumir la API de Laravel
El servicio se encarga de realizar peticiones para obtener los datos necesarios de los usuarios para el acceso al programa. A continuación, se muestra el código utilizado:

#### Comando para construir un servicio en Angular
```bash
ng g s nombreServicio
```
#### Users

```bash
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURLUsers = 'http://127.0.0.1:8000/api/users/';
  constructor(private _httpClient: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this._httpClient.get<User[]>(this.apiURLUsers);
  }

  insertUser(user: User) : Observable<Object>{
    return this._httpClient.post(this.apiURLUsers, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this._httpClient.delete(`${this.apiURLUsers}${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this._httpClient.put(`${this.apiURLUsers}${id}`, user);
  }
  
}
```

#### Authors

```bash
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiURLAuthors = 'http://127.0.0.1:8000/api/authors/';

  constructor(private _httpClient: HttpClient) { }

  public getAuthors(): Observable<Author[]>{
    return this._httpClient.get<Author[]>(this.apiURLAuthors);
  }

  insertAuthor(author: Author) : Observable<Object>{
    return this._httpClient.post(this.apiURLAuthors, author);
  }

  deleteAuthor(id: number): Observable<Object> {
    return this._httpClient.delete(`${this.apiURLAuthors}${id}`);
  }

  updateAuthor(id: number, author: Author): Observable<Object> {
    return this._httpClient.put(`${this.apiURLAuthors}${id}`, author);
  }
  
}
```

#### Books

```bash
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiURL = 'http://127.0.0.1:8000/api/books/';

  constructor(private _httpClient: HttpClient) { }

  public getBooks(): Observable<Book[]>{
    return this._httpClient.get<Book[]>(this.apiURL);
  }
}
```

## Parte 3: Creación de Componentes
Los componentes se encargan de la parte visual, permitiendo interactuar al usuario con el sistema.


#### Login
```bash
<form autocomplete="off">

    <div id="capa_inicio" class="capa_modal_light" style="display: inline; background: url(library.jpg); background-repeat: no-repeat; background-size: cover; background-position: center; opacity: 0.7;">
      
    </div>
    
    <div style="width: 100%;">
      
      <div class="ventana_modal" style="width: 96%; max-width: 330px;">
          
        <div style="width: 100%;">
          <div class="contenedor_inicio">
            <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; margin-top: 20px;">
              <img src="logo.jpeg" width="100" style="border-radius: 50%;">
              <p style="width: 100%; font-weight: bold; font-size: 35px; color: #4C4741; text-align: center; margin-top: 5px;">LV</p>
              <p style="width: 100%; font-weight: bold; font-size: 18px; color: #4C4741; text-align: center; margin-top: 10px;">Librería Virtual</p>
            </div>

            <p style="margin-top: 30px; font-weight: bold; color: #dc143c;">Correo electrónico:</p>
            <input [(ngModel)]="userMail" name="userMail" type="text" class="caja2" style="margin-top: 5px;" placeholder="Usuario">

            <p style="margin-top: 20px; font-weight: bold; color: #dc143c;">Contraseña:</p>
            <input [(ngModel)]="password" name="password"  type="password" class="caja2" style="margin-top: 5px;" placeholder="Contraseña">

            <a class="btn_google3" style="width: 100%; display: block; margin-top: 20px;" (click)="login()">Iniciar sesión</a>

            <p id="lkbforget" style="margin-top: 17px; color: dimgray; text-align: center; cursor: pointer; font-size: 13px;">¿Olvidaste tu contraseña?</p>

          </div>
        </div>
      </div>
      
    </div>

  </form>
```

```bash
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  users:User[]=[];
  password: string = '';
  userMail:String = '';
  constructor(private userService:UsersService,private router:Router){

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe( (data:User[]) =>{
      this.users = data;
      console.log(this.users);
    });
  }
  
  login() {
    const userM = this.userMail;
    const password = this.password;
    // Verificar si las credenciales coinciden con algún usuario en testUsers
    const user = this.users.find(
      user => user.email === userM && user.password === password
    );

    if (user) {
      this.router.navigate(['/menu/home']);
    } else {
      alert('Usuario no encontrado');
    }
  }
}
```
```bash
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
}

/* Contenedor del botón */
.button-container {
    display: flex;
    justify-content: flex-end; /* Alinea el botón al extremo derecho */
    width: 100%;
    margin-bottom: 10px; /* Espacio debajo del botón */
  }
  
  /* Estilo del botón */
  .add-user-button {
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .full-width {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .button-group {
    align-content: center;
  }
  
  button.cancel-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: red;
  }
  
  button.cancel-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  button.save-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: rgb(84, 73, 212);
  }
  
  button.save-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
```

#### Menu
```bash
<main>
  <h1 class="visually-hidden">Sidebars examples</h1>

  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a routerLink="/menu/home" routerLinkActive="active" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"/></svg>
          Home
        </a>
      </li>
      <li>
        <a routerLink="/menu/user" routerLinkActive="active" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg>
          Usuarios
        </a>
      </li>
      <li>
        <a routerLink="/menu/author" routerLinkActive="active" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"/></svg>
          Autor
        </a>
      </li>
      <li>
        <a routerLink="/menu/book" routerLinkActive="active" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"/></svg>
          Libros
        </a>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>

  <div class="b-example-divider"></div>

  <!-- Contenido dinámico del router -->
  <div class="content" style="width: 100%;">
    <router-outlet></router-outlet>
  </div>
</main>
```
```bash
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }
}
```
```bash
body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
  
  html {
    height: -webkit-fill-available;
  }
  
  main {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    height: -webkit-fill-available;
    max-height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  .b-example-divider {
    flex-shrink: 0;
    width: 0.1rem;
    height: 100vh;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }
  
  .bi {
    vertical-align: -.125em;
    pointer-events: none;
    fill: currentColor;
  }
  
  .dropdown-toggle { outline: 0; }
  
  .nav-flush .nav-link {
    border-radius: 0;
  }
  
  .btn-toggle {
    display: inline-flex;
    align-items: center;
    padding: .25rem .5rem;
    font-weight: 600;
    color: rgba(0, 0, 0, .65);
    background-color: transparent;
    border: 0;
  }
  .btn-toggle:hover,
  .btn-toggle:focus {
    color: rgba(0, 0, 0, .85);
    background-color: #d2f4ea;
  }
  
  .btn-toggle::before {
    width: 1.25em;
    line-height: 0;
    content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    transition: transform .35s ease;
    transform-origin: .5em 50%;
  }
  
  .btn-toggle[aria-expanded="true"] {
    color: rgba(0, 0, 0, .85);
  }
  .btn-toggle[aria-expanded="true"]::before {
    transform: rotate(90deg);
  }
  
  .btn-toggle-nav a {
    display: inline-flex;
    padding: .1875rem .5rem;
    margin-top: .125rem;
    margin-left: 1.25rem;
    text-decoration: none;
  }
  .btn-toggle-nav a:hover,
  .btn-toggle-nav a:focus {
    background-color: #d2f4ea;
  }
  
  .scrollarea {
    overflow-y: auto;
  }
  
  .fw-semibold { font-weight: 600; }
  .lh-tight { line-height: 1.25; }

  .bg-light {
    background-color: #f8f9fa !important;
  }
  
  .nav-link.active {
    background-color: #0d6efd;
    color: white;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .nav-link {
    color: rgb(255, 255, 255); /* Color base de las opciones */
    background-color: transparent; /* Fondo inicial */
    transition: background-color 0.3s, color 0.3s; /* Suaviza el cambio */
  }
  
  .nav-link:hover {
    color: #000; /* Cambia el texto al pasar el puntero */
    background-color: #0d6efd; /* Cambia el fondo al pasar el puntero */
  }
```

#### Creacion de usuarios
```bash
<div style="align-content: center; color: white; background-color: rgb(33, 37, 41); height: 70px; text-align: center;">
    <h2 >Módulo de usuario</h2>
</div>
<div class="container">
    <div class="button-container">
        <button mat-raised-button color="primary" (click)="openCreate()" class="add-user-button">Agregar Usuario</button>
    </div>      
    <mat-form-field>
      <mat-label>Filtro</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="¿Que desea buscar?" #input>
    </mat-form-field>
  
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource" class="table-striped table-bordered " matSort>
  
        <!-- Position Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>RFC</th>
          <td mat-cell *matCellDef="let user">{{ user.id }}  </td>
        </ng-container>
  
        <!-- Position Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
          <td mat-cell *matCellDef="let user">{{ user.name }}</td>
        </ng-container>
  
        <!-- Symbol Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
          <td mat-cell *matCellDef="let user">{{ user.email }}</td>
        </ng-container>
  
        <!-- Name Column -->
        <ng-container matColumnDef="password">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Password</th>
          <td mat-cell *matCellDef="let user">{{ user.password }}</td>
        </ng-container>
  
        <!-- Symbol Column -->
        <ng-container matColumnDef="rol">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Rol</th>
          <td mat-cell *matCellDef="let user">{{ user.rol.name }}</td>
        </ng-container>

        <!-- Symbol Column -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef >Acciones</th>
        <td mat-cell *matCellDef="let user">
          <button          
              (click)="openEdit(user)"
              type="button"
              class="save-button"
            >
              Editar
            </button>

            <button
            (click)="deleteUser(user.id)"
            type="button"
            class="cancel-button"
          >
            Eliminar
          </button>
        </td>
      </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  
        <!-- Row shown when there is no matching data. -->
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="4">Ninguna coincidencia: "{{input.value}}"</td>
        </tr>
  
      </table>
  
      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic usuarios"
      >
      </mat-paginator>
    </div>
    <div class="modal-overlay" *ngIf="createOpen || editOpen">
        <div class="modal-content">
          <h3>Crear Usuario</h3>
          <form>
            <mat-form-field class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput [(ngModel)]="user.name" name="name" required />
            </mat-form-field>
    
            <mat-form-field class="full-width">
              <mat-label>Correo</mat-label>
              <input matInput type="email" [(ngModel)]="user.email" name="email" required />
            </mat-form-field>
    
            <mat-form-field class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" [(ngModel)]="user.password" name="password" required />
            </mat-form-field>
    
            <div class="button-group">
              <button mat-button type="button" class="cancel-button" (click)="closeModal()">Cancelar</button>
              <button *ngIf="createOpen" mat-raised-button class="save-button" (click)="createUser()" type="button">Crear</button>
              <button *ngIf="editOpen" mat-raised-button class="save-button" (click)="updateUser()" type="button">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
  </div>
```
```bash
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  user: User = new User();
  createOpen = false;
  editOpen = false;
  usuarios: User[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'password',
    'rol',
    'acciones',
  ];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (datos) => {
        this.usuarios = datos;
        this.dataSource.data = this.usuarios;
      },
      error: (errores) => console.log(errores),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreate() {
    this.createOpen = true;
  }

  openEdit(updateUser: User) {
    this.editOpen = true;
    this.user.id = updateUser.id;
    this.user.name = updateUser.name;
    this.user.email = updateUser.email;
    this.user.password = updateUser.password;
    this.user.id_rol = updateUser.id_rol;
    this.user.created_at = updateUser.created_at;
    this.user.updated_at = updateUser.updated_at;
    this.user.rol = updateUser.rol;
  }

  closeModal() {
    this.createOpen = false;
    this.editOpen = false;
    this.user = new User();
  }

  createUser() {
    console.log('el usuario que enviamos essssss ',this.user);
    // Lógica para crear un nuevo usuario
    this.userService.insertUser(this.user).subscribe({
      next: (result) => {
        console.log(result);
        Swal.fire({
          title: 'Usuario Insertado!',
          text: 'Registro Exitoso!',
          icon: 'success',
        });
        this.closeModal(); // Cierra el modal después de crear el usuari
        this.getUsers();
      },
      error: (errores) => {
        console.log(errores);
        Swal.fire({
          title: 'Usuario No Insertado!',
          text: errores.toString(),
          icon: 'error',
        });
      },
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado con éxito.',
              icon: 'success',
            });
            // Opcional: Actualizar la lista de usuarios después de eliminar
            this.getUsers();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el usuario.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El usuario ha sido actualizado correctamente.',
          icon: 'success',
        });
        this.closeModal(); // Cierra el modal después de la actualización
        this.getUsers(); // Actualiza la lista de usuarios si estás mostrando una tabla
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el usuario.',
          icon: 'error',
        });
      },
    });
  }
}
```
```bash
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
}

/* Contenedor del botón */
.button-container {
    display: flex;
    justify-content: flex-end; /* Alinea el botón al extremo derecho */
    width: 100%;
    margin-bottom: 10px; /* Espacio debajo del botón */
  }
  
  /* Estilo del botón */
  .add-user-button {
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .full-width {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .button-group {
    align-content: center;
  }
  
  button.cancel-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: red;
  }
  
  button.cancel-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  button.save-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: rgb(84, 73, 212);
  }
  
  button.save-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
```
#### Creación de autores
```bash
<div style="align-content: center; color: white; background-color: rgb(33, 37, 41); height: 70px; text-align: center;">
    <h2 >Módulo de autor</h2>
</div>
<div class="container">
    <div class="button-container">
        <button mat-raised-button color="primary" (click)="openCreate()" class="add-user-button">Agregar Autor</button>
    </div>      
    <mat-form-field>
      <mat-label>Filtro</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="¿Que desea buscar?" #input>
    </mat-form-field>
  
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource" class="table-striped table-bordered " matSort>
  
        <!-- Position Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
          <td mat-cell *matCellDef="let author">{{ author.id }}  </td>
        </ng-container>
  
        <!-- Position Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
          <td mat-cell *matCellDef="let author">{{ author.name }}</td>
        </ng-container>
  
        <!-- Symbol Column -->
        <ng-container matColumnDef="nationality">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nacionalidad/th>
          <td mat-cell *matCellDef="let author">{{ author.nationality }}</td>
        </ng-container>
  
        <!-- Name Column -->
        <ng-container matColumnDef="biography">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Biografía</th>
          <td mat-cell *matCellDef="let author">{{ author.biography }}</td>
        </ng-container>

        <!-- Symbol Column -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef >Acciones</th>
        <td mat-cell *matCellDef="let author">
          <button          
              (click)="openEdit(author)"
              type="button"
              class="save-button"
            >
              Editar
            </button>

            <button
            (click)="deleteAuthor(author.id)"
            type="button"
            class="cancel-button"
          >
            Eliminar
          </button>
        </td>
      </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  
        <!-- Row shown when there is no matching data. -->
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="4">Ninguna coincidencia: "{{input.value}}"</td>
        </tr>
  
      </table>
  
      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic usuarios"
      >
      </mat-paginator>
    </div>
    <div class="modal-overlay" *ngIf="createOpen || editOpen">
        <div class="modal-content">
          <h3>Crear Autor</h3>
          <form>
            <mat-form-field class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput [(ngModel)]="author.name" name="name" required />
            </mat-form-field>
    
            <mat-form-field class="full-width">
              <mat-label>Nacionalidad</mat-label>
              <input matInput type="text" [(ngModel)]="author.nationality" name="nationality" required />
            </mat-form-field>
    
            <mat-form-field class="full-width">
              <mat-label>Biografía</mat-label>
              <input matInput type="text" [(ngModel)]="author.biography" name="biography" required />
            </mat-form-field>
    
            <div class="button-group">
              <button mat-button type="button" class="cancel-button" (click)="closeModal()">Cancelar</button>
              <button *ngIf="createOpen" mat-raised-button class="save-button" (click)="createAuthor()" type="button">Crear</button>
              <button *ngIf="editOpen" mat-raised-button class="save-button" (click)="updateAuthor()" type="button">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
  </div>
```
```bash
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Author } from '../../../models/author';
import { AuthorsService } from '../../../services/authors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent implements OnInit {
  author: Author = new Author();
  createOpen = false;
  editOpen = false;
  authors: Author[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'nationality',
    'biography',
    'acciones'
  ];
  dataSource = new MatTableDataSource<Author>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authorService: AuthorsService, private router: Router) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (datos) => {
        this.authors = datos;
        console.log(this.authors);
        this.dataSource.data = this.authors;
      },
      error: (errores) => console.log(errores),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreate() {
    this.createOpen = true;
  }

  openEdit(updateAuthor: Author) {
    this.editOpen = true;
    this.author.id = updateAuthor.id;
    this.author.name = updateAuthor.name;
    this.author.nationality = updateAuthor.nationality;
    this.author.biography = updateAuthor.biography;
    this.author.created_at = updateAuthor.created_at;
    this.author.updated_at = updateAuthor.updated_at;
  }

  closeModal() {
    this.createOpen = false;
    this.editOpen = false;
    this.author = new Author();
  }

  createAuthor() {
    // Lógica para crear un nuevo usuario
    this.authorService.insertAuthor(this.author).subscribe({
      next: (result) => {
        console.log(result);
        Swal.fire({
          title: 'Autor Insertado!',
          text: 'Registro Exitoso!',
          icon: 'success',
        });
        this.closeModal(); // Cierra el modal después de crear el usuari
        this.getAuthors();
      },
      error: (errores) => {
        console.log(errores);
        Swal.fire({
          title: 'Autor No Insertado!',
          text: errores.toString(),
          icon: 'error',
        });
      },
    });
  }

  deleteAuthor(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este autor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.deleteAuthor(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El autor ha sido eliminado con éxito.',
              icon: 'success',
            });
            // Opcional: Actualizar la lista de usuarios después de eliminar
            this.getAuthors();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar al autor.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  updateAuthor() {
    this.authorService.updateAuthor(this.author.id, this.author).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El autor ha sido actualizado correctamente.',
          icon: 'success',
        });
        this.closeModal(); // Cierra el modal después de la actualización
        this.getAuthors(); // Actualiza la lista de usuarios si estás mostrando una tabla
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar al autor.',
          icon: 'error',
        });
      },
    });
  }
}
```
```bash
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
}

/* Contenedor del botón */
.button-container {
    display: flex;
    justify-content: flex-end; /* Alinea el botón al extremo derecho */
    width: 100%;
    margin-bottom: 10px; /* Espacio debajo del botón */
  }
  
  /* Estilo del botón */
  .add-user-button {
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .full-width {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .button-group {
    align-content: center;
  }
  
  button.cancel-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: red;
  }
  
  button.cancel-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  button.save-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: rgb(84, 73, 212);
  }
  
  button.save-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
```
#### Creación de libros
```bash
<div style="align-content: center; color: white; background-color: rgb(33, 37, 41); height: 70px; text-align: center;">
    <h2 >Módulo de Libros</h2>
</div>
<div class="container">
    <div class="button-container">
        <button mat-raised-button color="primary" (click)="openCreate()" class="add-user-button">Agregar Libro</button>
    </div>      
    <mat-form-field>
      <mat-label>Filtro</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="¿Que desea buscar?" #input>
    </mat-form-field>
  
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource" class="table-striped table-bordered " matSort>
  
        <!-- Position Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
          <td mat-cell *matCellDef="let book">{{ book.id }}  </td>
        </ng-container>
  
        <!-- Position Column -->
        <ng-container matColumnDef="titulo">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Titulo</th>
          <td mat-cell *matCellDef="let book">{{ book.title }}</td>
        </ng-container>
  
        <!-- Symbol Column -->
        <ng-container matColumnDef="descripcion">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Descripción</th>
          <td mat-cell *matCellDef="let book">{{ book.description }}</td>
        </ng-container>
  
        <!-- Name Column -->
        <ng-container matColumnDef="precio">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Precio</th>
          <td mat-cell *matCellDef="let book">{{ book.price }}</td>
        </ng-container>

        <ng-container matColumnDef="categoria">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Categoria</th>
            <td mat-cell *matCellDef="let book">{{ book.category.name }}</td>
          </ng-container>

          <ng-container matColumnDef="autor">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Autor</th>
            <td mat-cell *matCellDef="let book">{{ book.author.name }}</td>
          </ng-container>

        <!-- Symbol Column -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef >Acciones</th>
        <td mat-cell *matCellDef="let book">
          <button          
              (click)="openEdit(book)"
              type="button"
              class="save-button"
            >
              Editar
            </button>

            <button
            (click)="deleteBook(book.id)"
            type="button"
            class="cancel-button"
          >
            Eliminar
          </button>
        </td>
      </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let book; columns: displayedColumns"></tr>
  
        <!-- Row shown when there is no matching data. -->
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="4">Ninguna coincidencia: "{{input.value}}"</td>
        </tr>
  
      </table>
  
      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic usuarios"
      >
      </mat-paginator>
    </div>
    <div class="modal-overlay" *ngIf="createOpen || editOpen">
        <div class="modal-content">
          <h3>Agregar Libro</h3>
          <form>
            <mat-form-field class="full-width">
              <mat-label>Titulo</mat-label>
              <input matInput [(ngModel)]="book.title" name="title" required />
            </mat-form-field>
    
            <mat-form-field class="full-width">
              <mat-label>Descripcion</mat-label>
              <input matInput type="text" [(ngModel)]="book.description" name="description" required />
            </mat-form-field>
    
            <mat-form-field class="full-width">
              <mat-label>Precio</mat-label>
              <input matInput type="text" [(ngModel)]="book.price" name="price" required />
            </mat-form-field>

            <mat-form-field class="full-width">
                <mat-label>Cantidad</mat-label>
                <input matInput type="text" [(ngModel)]="book.number_books" name="number_books" required />
              </mat-form-field>
               <!-- Autocompletado para categorias -->
              <mat-form-field class="full-width">
                <mat-label>Categoría</mat-label>
                <input 
                  type="text"
                  matInput 
                  [matAutocomplete]="categoryAuto"
                  [(ngModel)]="selectedCategoryName"
                  (ngModelChange)="filterCategories($event)"
                  name="category"
                  required
                />
                <mat-autocomplete #categoryAuto="matAutocomplete" (optionSelected)="onCategorySelected($event)">
                  <mat-option *ngFor="let category of filteredCategories" [value]="category.name">
                    {{ category.name }}
                  </mat-option>
                </mat-autocomplete>
              </mat-form-field>
            <!-- Autocompletado para autores -->
      <mat-form-field class="full-width">
        <mat-label>Autor</mat-label>
        <input 
          type="text"
          matInput 
          [matAutocomplete]="authorAuto"
          [(ngModel)]="selectedAuthorName"
          (ngModelChange)="filterAuthors($event)"
          name="author"
          required
        />
        <mat-autocomplete #authorAuto="matAutocomplete" (optionSelected)="onAuthorSelected($event)">
          <mat-option *ngFor="let author of filteredAuthors" [value]="author.name">
            {{ author.name }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

            <div class="button-group">
              <button mat-button type="button" class="cancel-button" (click)="closeModal()">Cancelar</button>
              <button *ngIf="createOpen" mat-raised-button class="save-button" (click)="createBook()" type="button">Crear</button>
              <button *ngIf="editOpen" mat-raised-button class="save-button" (click)="updateBook()" type="button">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
  </div>
```

```bash
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Author } from '../../../models/author';
import { AuthorsService } from '../../../services/authors.service';
import { Category } from '../../../models/category';
import { CategoriesService } from '../../../services/categories.service';
import { Book } from '../../../models/book';
import { BooksService } from '../../../services/books.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    CommonModule,
    FormsModule,
  MatAutocompleteModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  book: Book = new Book();
  createOpen = false;
  editOpen = false;
  books: Book[] = [];
  authors: Author[] = [];
  categories: Category [] = [];
  filteredAuthors: Author[] = [];
  filteredCategories: Category[] = [];
  selectedAuthorName: string = '';
  selectedCategoryName: string = '';
  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'precio',
    'categoria',
    'autor',
    'acciones'
  ];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private authorService: AuthorsService,private categoryService:CategoriesService,
    private booksService:BooksService, private router: Router){}

  ngOnInit(): void {
    this.getBooks();
    this.getAuthors();
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (datos) => {
        this.authors = datos;
        console.log(this.authors);
        this.filteredAuthors = this.authors;
    
      },
      error: (errores) => console.log(errores),
    });
  }
  getBooks() {
    this.booksService.getBooks().subscribe({
      next: (datos) => {
        this.books = datos;
        console.log(this.books);
        this.dataSource.data = this.books;
      },
      error: (errores) => console.log(errores),
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (datos) => {
        this.categories = datos;
        console.log(this.categories);
        this.filteredCategories = this.categories;
      },
      error: (errores) => console.log(errores),
    });
  }
  
  filterAuthors(searchTerm: string): void {
    this.filteredAuthors = this.authors.filter(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  filterCategories(searchTerm: string): void {
    this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  onAuthorSelected(event: any): void {
    const selectedAuthor = this.authors.find(author => author.name === event.option.value);
    if (selectedAuthor) {
      this.book.id_author = selectedAuthor.id;
    }
  }

  onCategorySelected(event: any): void {
    const selectedCategory = this.categories.find(category => category.name === event.option.value);
    if (selectedCategory) {
      this.book.id_category = selectedCategory.id;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openCreate() {
    this.createOpen = true;
  }
  openEdit(updateBook: Book) {
    this.editOpen = true;
    this.book.id = updateBook.id;
    this.book.title = updateBook.title;
    this.book.description = updateBook.description;
    this.book.price = updateBook.price;
    this.book.number_books = updateBook.number_books;
    this.book.id_author = updateBook.id_author;
    this.book.id_category = updateBook.id_category;
    this.book.created_at = updateBook.created_at;
    this.book.updated_at = updateBook.updated_at;
  }
  closeModal() {
    this.createOpen = false;
    this.editOpen = false;
    this.book = new Book();
  }
  createBook() {
    // Lógica para crear un nuevo usuario
    this.booksService.insertBook(this.book).subscribe({
      next: (result) => {
        console.log(result);
        Swal.fire({
          title: 'Libro Insertado!',
          text: 'Registro Exitoso!',
          icon: 'success',
        });
        this.closeModal(); // Cierra el modal después de crear el usuari
        this.getBooks();
      },
      error: (errores) => {
        console.log(errores);
        Swal.fire({
          title: 'Libro No Insertado!',
          text: errores.toString(),
          icon: 'error',
        });
      },
    });
  }
  deleteBook(id: number) {
    console.log(id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este libro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.booksService.deleteBook(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El libro ha sido eliminado con éxito.',
              icon: 'success',
            });
            // Opcional: Actualizar la lista de usuarios después de eliminar
            this.getBooks();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el libro.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
  updateBook() {
    this.booksService.updateBook(this.book.id, this.book).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El libro ha sido actualizado correctamente.',
          icon: 'success',
        });
        this.closeModal(); // Cierra el modal después de la actualización
        this.getBooks(); // Actualiza la lista de 
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar al libro.',
          icon: 'error',
        });
      },
    });
  }
}
```

```bash
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
}

/* Contenedor del botón */
.button-container {
    display: flex;
    justify-content: flex-end; /* Alinea el botón al extremo derecho */
    width: 100%;
    margin-bottom: 10px; /* Espacio debajo del botón */
  }
  
  /* Estilo del botón */
  .add-user-button {
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .full-width {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .button-group {
    align-content: center;
  }
  
  button.cancel-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: red;
  }
  
  button.cancel-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  button.save-button {
    color: hsl(0, 0%, 96%);
    border: 1px solid #ccc;
    padding: 5px 15px;
    border-radius: 5px;
    margin-right: 10px;
    transition: background-color 0.3s, color 0.3s;
    background-color: rgb(84, 73, 212);
  }
  
  button.save-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
```

## Parte 4: Ejecución del Proyecto
Para ejecutar la aplicación:
```bash
ng serve -o
```

## Resultado

### Diseño del Login

![Captura de pantalla 2024-12-13 162346](https://github.com/user-attachments/assets/1d8c80ae-0426-4b47-8f06-46ed7db04b8e)

### Diseño del Home

![Captura de pantalla 2024-12-13 162523](https://github.com/user-attachments/assets/f7cd07f8-154d-4b30-aa12-574ac657192d)

### Diseño módulo de Usuarios

![Captura de pantalla 2024-12-13 162619](https://github.com/user-attachments/assets/1822f6b2-6375-4b8b-8587-f98c479586c1)

### Diseño del modal para crear y editar usuarios

![Captura de pantalla 2024-12-13 162717](https://github.com/user-attachments/assets/f4a9c536-7d37-4722-8a60-e526bb25f61f)

### Diseño de la ventana de notificaciones al realizar una acción

![Captura de pantalla 2024-12-13 162919](https://github.com/user-attachments/assets/81702e1f-2fc2-4e98-a257-3b05edda0dd1)

### Diseño del módulo de Autores

![Captura de pantalla 2024-12-13 163217](https://github.com/user-attachments/assets/b4c0b874-688c-4643-8962-fa18302d699e)

### Diseño del módulo de Libros

![Captura de pantalla 2024-12-13 163253](https://github.com/user-attachments/assets/43354a77-2da2-4ea6-9546-8bb8b6dd3b35)


## Conclusión
