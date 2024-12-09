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
