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
