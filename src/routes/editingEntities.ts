import { Router } from 'express';
import { getEditingEntities, createEditingEntity, updateEditingEntity, deleteEditingEntity, connectBookToEditingEntity, disconnectBookFromEditingEntity } from "../controllers/EditingEntityController";

export function EditingEntitiesRoutes() {
  const router = Router();

  router.get('/', getEditingEntities);
  router.post('/', createEditingEntity);
  router.put('/:id', updateEditingEntity);
  router.delete('/:id', deleteEditingEntity);
  router.post('/:id/connect/:bookId', connectBookToEditingEntity);
  router.post('/:id/disconnect/:bookId', disconnectBookFromEditingEntity);


  return router;

}