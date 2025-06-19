import { Request, Response } from "express";
import { GetBooksDTO, CreateBookDTO, UpdateBookDTO } from "../interfaces/BookInterface";
import BookService from "../services/BookService";

async function getBooks(req: Request, res: Response) {
  const { id, title } = req.query;
  const data: GetBooksDTO = {
    id: typeof id === 'string' ? id : undefined,
    title: typeof title === 'string' ? title : undefined
  };

  try {
    const books = await BookService.getBooks(data);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function createBook(req: Request, res: Response) {
  const { title, author, isbn, publishedYear, editingEntityId, editingEntityName } = req.body;
  if (!title || !author || !isbn || !publishedYear) {
    return res.status(400).json({ error: "Title, author, ISBN, and published year are required" });
  }
  if (typeof title !== 'string' || typeof author !== 'string' || typeof isbn !== 'string' || typeof publishedYear !== 'number') {
    return res.status(400).json({ error: "Title, author, ISBN, and published year must be string" });
  }

  const data: CreateBookDTO = {
    title,
    author,
    isbn,
    publishedYear,
    editingEntityId: typeof editingEntityId === 'string' ? editingEntityId : undefined,
    editingEntityName: typeof editingEntityName === 'string' ? editingEntityName : undefined
  };
  try {
    const newBook = await BookService.createBook(data);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function updateBook(req: Request, res: Response) {
  const { id } = req.params;
  const { title, author, isbn, publishedYear } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Book ID is required" });
  }

  const data: UpdateBookDTO = {
    id,
    title: typeof title === 'string' ? title : undefined,
    author: typeof author === 'string' ? author : undefined,
    isbn: typeof isbn === 'string' ? isbn : undefined,
    publishedYear: typeof publishedYear === 'number' ? publishedYear : undefined
  };

  try {
    const updatedBook = await BookService.updateBook(data);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Book ID is required" });
  }

  try {
    await BookService.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};