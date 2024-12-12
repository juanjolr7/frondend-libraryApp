import { Author } from "./author";
import { Category } from "./category";
export class Book {
    id: number;
    title: string;
    description: string;
    price: number;
    id_category: number;
    id_author: number;
    number_books: number;
    created_at: Date;
    updated_at: Date;
    category: Category;
    author:Author;
}
