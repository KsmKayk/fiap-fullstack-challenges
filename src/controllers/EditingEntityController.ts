import { Request, Response } from "express";
import { GetEditingEntityDTO, UpdateEditingEntityDTO, ConnectBookEditingEntityDTO, DisconnectBookEditingEntityDTO } from "../interfaces/EditingEntityInterface"
import EditingEntityService from "../services/EditingEntityService";

async function getEditingEntities(req: Request, res: Response) {
  const { id, name } = req.query;
  const data: GetEditingEntityDTO = {
    id: typeof id === 'string' ? id : undefined,
    name: typeof name === 'string' ? name : undefined
  };
  try {
    const editingEntities = await EditingEntityService.getEditingEntities(data);
    res.status(200).json(editingEntities);
  } catch (error) {
    console.error("Error fetching editing entities:", error);
    res.status(500).json({ error: "Internal server error" });
  }

}
async function createEditingEntity(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (typeof name !== 'string') {
    return res.status(400).json({ error: "Name must be a string" });
  }

  try {
    const newEditingEntity = await EditingEntityService.createEditingEntity(name);
    res.status(201).json(newEditingEntity);
  } catch (error) {
    console.error("Error creating editing entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function updateEditingEntity(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: "EditingEntityId and name are required" });
  }
  if (typeof name !== 'string') {
    return res.status(400).json({ error: "Name must be a string" });
  }

  const data: UpdateEditingEntityDTO = {
    id,
    name
  };

  try {
    const updatedEditingEntity = await EditingEntityService.updateEditingEntity(data);
    res.status(200).json(updatedEditingEntity);
  } catch (error) {
    console.error("Error updating editing entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteEditingEntity(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "EditingEntityId is required" });
  }

  try {
    await EditingEntityService.deleteEditingEntity(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting editing entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function connectBookToEditingEntity(req: Request, res: Response) {
  const { id, bookId } = req.params;

  if (!id || !bookId) {
    return res.status(400).json({ error: "EditingEntityId and BookId are required" });
  }

  const data: ConnectBookEditingEntityDTO = {
    bookId,
    editingEntityId: id
  };

  try {
    const connectedEntity = await EditingEntityService.connectBookToEditingEntity(data);
    res.status(200).json(connectedEntity);
  } catch (error) {
    console.error("Error connecting book to editing entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function disconnectBookFromEditingEntity(req: Request, res: Response) {
  const { id, bookId } = req.params;

  if (!id || !bookId) {
    return res.status(400).json({ error: "EditingEntityId and BookId are required" });
  }

  const data: DisconnectBookEditingEntityDTO = {
    bookId,
    editingEntityId: id
  };

  try {
    const disconnectedEntity = await EditingEntityService.disconnectBookFromEditingEntity(data);
    res.status(200).json(disconnectedEntity);
  } catch (error) {
    console.error("Error disconnecting book from editing entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export {
  getEditingEntities,
  createEditingEntity,
  updateEditingEntity,
  deleteEditingEntity,
  connectBookToEditingEntity,
  disconnectBookFromEditingEntity
};