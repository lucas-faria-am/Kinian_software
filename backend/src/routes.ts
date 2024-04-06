import { Router } from "express";
import UserController from "./controllers/UserController";
import OfertaController from "./controllers/OfertaController";

const routes = Router();

//User routes
routes.post("/user", new UserController().create);
routes.get("/user", new UserController().findAll);
routes.get("/user/:id", new UserController().findOne);
routes.put("/user/:id", new UserController().update);
routes.delete("/user/:id", new UserController().delete);

//Oferta routes
routes.post("/oferta", new OfertaController().createOferta);

export default routes;
