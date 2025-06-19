import { Router } from 'express';
import { getBooks, createBook, updateBook, deleteBook } from "../controllers/BookController";
import { Request, Response } from 'express';

export function BooksRoutes() {
  const router = Router();

  router.get('/', getBooks);
  router.post('/', createBook);
  router.put('/:id', updateBook);
  router.delete('/:id', deleteBook);


  return router;

}