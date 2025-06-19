import prisma from "../util/prisma";
import EditingEntityService from "./EditingEntityService";
import { BookDTO, GetBooksDTO, CreateBookDTO, UpdateBookDTO } from "../interfaces/BookInterface";
import { EditingEntityDTO } from "../interfaces/EditingEntityInterface";

class BookService {
  async getBooks(data: GetBooksDTO): Promise<BookDTO | BookDTO[]> {
    if (data.id) {
      const book: BookDTO | null = await prisma.book.findUnique({
        where: { id: data.id },
        include: {
          editingEntities: {
            include: { editingEntity: true }
          }
        }
      });

      if (!book) return [];

      if (data.title && book.title !== data.title) {
        throw new Error("Livro encontrado, mas o título não corresponde.");
      }

      return book;
    }

    if (data.title) {
      const books: BookDTO[] = await prisma.book.findMany({
        where: { title: data.title },
        include: {
          editingEntities: {
            include: { editingEntity: true }
          }
        }
      });
      return books;
    }

    const books: BookDTO[] = await prisma.book.findMany({
      include: {
        editingEntities: {
          include: { editingEntity: true }
        }
      }
    });
    return books;
  }

  async createBook(data: CreateBookDTO): Promise<BookDTO> {
    let editingEntity: EditingEntityDTO | null = null;

    if (data.editingEntityId) {
      const editingEntityResult = await EditingEntityService.getEditingEntities({ "id": data.editingEntityId });

      if (!editingEntityResult) {
        throw new Error("Editing entity not found");
      }

      if (Array.isArray(editingEntityResult)) {
        throw new Error("Multiple editing entities found with the same ID");
      }

      if (data.editingEntityName && editingEntityResult.name !== data.editingEntityName) {
        throw new Error("Editing entity name does not match");
      }

      editingEntity = editingEntityResult;
    }

    if (!editingEntity && data.editingEntityName) {
      const editingEntityResult = await EditingEntityService.getEditingEntities({ "name": data.editingEntityName });

      if (Array.isArray(editingEntityResult) && editingEntityResult.length > 0) {
        editingEntity = editingEntityResult[0];
      }

      if (!editingEntity) {
        editingEntity = await EditingEntityService.createEditingEntity(data.editingEntityName);
      }
    }

    const bookData: any = {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      publishedYear: data.publishedYear,
      ...(editingEntity && {
        editingEntities: {
          create: {
            editingEntity: {
              connect: { id: editingEntity!.id }
            }
          }
        }
      })
    };


    const book: BookDTO = await prisma.book.create({
      data: bookData,
      include: {
        editingEntities: {
          include: {
            editingEntity: true, // Inclui os dados da entidade editora
          }
        }
      }
    });


    return book;

  }

  async updateBook(data: UpdateBookDTO): Promise<BookDTO> {
    const book: BookDTO | BookDTO[] = await this.getBooks({ id: data.id });
    if (Array.isArray(book)) {
      throw new Error("Multiple books found with the same ID");
    }
    if (!book) {
      throw new Error("Book not found");
    }
    const newBook: BookDTO = await prisma.book.update({
      where: { id: data.id },
      data: {
        title: data.title ?? book.title,
        author: data.author ?? book.author,
        isbn: data.isbn ?? book.isbn,
        publishedYear: data.publishedYear ?? book.publishedYear,
      }
    });
    return newBook;
  }

  async deleteBook(id: string): Promise<void> {
    const book: BookDTO | BookDTO[] = await this.getBooks({ id });
    if (Array.isArray(book)) {
      throw new Error("Multiple books found with the same ID");
    }
    if (!book) {
      throw new Error("Book not found");
    }

    await prisma.book.delete({
      where: { id }
    });
  }
}

export default new BookService();