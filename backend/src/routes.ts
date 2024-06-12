import { Router } from "express";
import UserController from "./controllers/UserController";
import OfertaController from "./controllers/OfertaController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { testeController } from "./controllers/testeController";

const routes = Router();

//User routes
routes.post("/user/login", new UserController().login);

routes.use(authMiddleware);
routes.post("/user/register", new UserController().register);
routes.get("/user/profile", new UserController().getProfile);
routes.get("/user", new UserController().findAll);
routes.get("/user/:id", new UserController().findOne);
routes.put("/user/:id", new UserController().update);
routes.delete("/user/:id", new UserController().delete);

//Despesa routes
routes.post("/despesa", new OfertaController().create);

//Receita routes
routes.post("/receita", new OfertaController().create);

//Oferta routes
routes.post("/oferta", new OfertaController().create);

//Teste routes
routes.get("/teste", new testeController().teste);

export default routes;
