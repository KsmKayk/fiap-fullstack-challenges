import { BookEditingEntityDTO } from './EditingEntityInterface';

interface BookDTO {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
  editingEntities?: BookEditingEntityDTO[];
}

interface GetBooksDTO {
  id?: string;
  title?: string;
}

interface CreateBookDTO {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  editingEntityId?: string;
  editingEntityName?: string;
}

interface UpdateBookDTO {
  id: string;
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
}

export { BookDTO, GetBooksDTO, CreateBookDTO, UpdateBookDTO };