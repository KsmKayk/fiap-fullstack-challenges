interface EditingEntityDTO {
  id: string;
  name: string;
  books?: BookEditingEntityDTO[];
}

interface BookEditingEntityDTO {
  bookId: string;
  editingEntityId: string;
  createdAt: Date;
  updatedAt: Date;
  editingEntity?: EditingEntityDTO;
}

interface GetEditingEntityDTO {
  id?: string;
  name?: string;
}

interface UpdateEditingEntityDTO {
  id: string;
  name: string;
}

interface ConnectBookEditingEntityDTO {
  bookId: string;
  editingEntityId: string;
}
interface DisconnectBookEditingEntityDTO {
  bookId: string;
  editingEntityId: string;
}

export { EditingEntityDTO, BookEditingEntityDTO, GetEditingEntityDTO, UpdateEditingEntityDTO, ConnectBookEditingEntityDTO, DisconnectBookEditingEntityDTO };