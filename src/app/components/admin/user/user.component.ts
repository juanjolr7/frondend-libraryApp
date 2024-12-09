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
