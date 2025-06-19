import prisma from "../util/prisma";
import { GetEditingEntityDTO, EditingEntityDTO, UpdateEditingEntityDTO, ConnectBookEditingEntityDTO, DisconnectBookEditingEntityDTO } from "../interfaces/EditingEntityInterface";
import { BookDTO } from "../interfaces/BookInterface";
import BookService from "./BookService";

class EditingEntityService {
  async getEditingEntities(data: GetEditingEntityDTO): Promise<EditingEntityDTO | EditingEntityDTO[]> {
    if (data.id) {
      const editingEntity: EditingEntityDTO | null = await prisma.editingEntity.findUnique({
        where: { id: data.id },
        include: {
          books: {
            include: { editingEntity: true }
          }
        }
      });

      if (!editingEntity) return [];

      if (data.name && editingEntity.name !== data.name) {
        throw new Error("Entidade Editora encontrada, mas o nome não corresponde.");
      }

      return editingEntity;
    }

    if (data.name) {
      const editingEntities: EditingEntityDTO[] = await prisma.editingEntity.findMany({
        where: { name: data.name },
        include: {
          books: {
            include: { editingEntity: true }
          }
        }
      });
      return editingEntities;
    }

    const editingEntities: EditingEntityDTO[] = await prisma.editingEntity.findMany({
      include: {
        books: {
          include: { editingEntity: true }
        }
      }
    });
    return editingEntities;
  }

  async createEditingEntity(name: string): Promise<EditingEntityDTO> {
    const editingEntity: EditingEntityDTO = await prisma.editingEntity.create({
      data: { name },
      include: {
        books: {
          include: { editingEntity: true }
        }
      }
    });

    return editingEntity;

  }

  async updateEditingEntity(data: UpdateEditingEntityDTO): Promise<EditingEntityDTO> {
    const editingEntity: EditingEntityDTO | null = await prisma.editingEntity.findUnique({
      where: { id: data.id }
    });

    if (!editingEntity) {
      throw new Error("Editing Entity not found");
    }

    const updatedEditingEntity: EditingEntityDTO = await prisma.editingEntity.update({
      where: { id: data.id },
      data: {
        name: data.name
      },
      include: {
        books: {
          include: { editingEntity: true }
        }
      }
    });

    return updatedEditingEntity;
  }

  async deleteEditingEntity(id: string): Promise<void> {
    const editingEntity: EditingEntityDTO | null = await prisma.editingEntity.findUnique({
      where: { id }
    });

    if (!editingEntity) {
      throw new Error("Editing Entity not found");
    }

    await prisma.editingEntity.delete({
      where: { id }
    });
  }

  async connectBookToEditingEntity(data: ConnectBookEditingEntityDTO): Promise<EditingEntityDTO> {
    const editingEntityResult: EditingEntityDTO | EditingEntityDTO[] = await this.getEditingEntities({ id: data.editingEntityId });
    if (Array.isArray(editingEntityResult)) {
      throw new Error("Multiple editing entities found with the same ID");
    }
    if (!editingEntityResult) {
      throw new Error("Editing Entity not found");
    }

    const bookResult: BookDTO | BookDTO[] = await BookService.getBooks({ id: data.bookId });
    if (Array.isArray(bookResult)) {
      throw new Error("Multiple books found with the same ID");
    }
    if (!bookResult) {
      throw new Error("Book not found");
    }

    const bookEditingEntity = await prisma.bookEditingEntity.create({
      data: {
        bookId: data.bookId,
        editingEntityId: data.editingEntityId,
      }
    });

    let newUpdatedEditingEntity: EditingEntityDTO = editingEntityResult
    newUpdatedEditingEntity.books = [...(editingEntityResult.books || []), bookEditingEntity];

    return newUpdatedEditingEntity;

  }

  async disconnectBookFromEditingEntity(data: DisconnectBookEditingEntityDTO): Promise<void> {
    const editingEntityResult: EditingEntityDTO | EditingEntityDTO[] = await this.getEditingEntities({ id: data.editingEntityId });
    if (Array.isArray(editingEntityResult)) {
      throw new Error("Multiple editing entities found with the same ID");
    }
    if (!editingEntityResult) {
      throw new Error("Editing Entity not found");
    }

    const bookResult: BookDTO | BookDTO[] = await BookService.getBooks({ id: data.bookId });
    if (Array.isArray(bookResult)) {
      throw new Error("Multiple books found with the same ID");
    }
    if (!bookResult) {
      throw new Error("Book not found");
    }
    const bookEditingEntity = await prisma.bookEditingEntity.findUnique({
      where: {
        bookId_editingEntityId: {
          bookId: data.bookId,
          editingEntityId: data.editingEntityId
        }
      }
    });
    if (!bookEditingEntity) {
      throw new Error("Book is not connected to the Editing Entity");
    }
    await prisma.bookEditingEntity.delete({
      where: {
        bookId_editingEntityId: {
          bookId: data.bookId,
          editingEntityId: data.editingEntityId
        }
      }
    });
  }
}

export default new EditingEntityService();