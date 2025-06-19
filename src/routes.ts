import { Router, Request, Response } from "express";
import { BooksRoutes } from "./routes/books";
import { EditingEntitiesRoutes } from "./routes/editingEntities";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello Library' });
});
routes.use('/books', BooksRoutes());
routes.use('/editing-entities', EditingEntitiesRoutes());

export default routes;