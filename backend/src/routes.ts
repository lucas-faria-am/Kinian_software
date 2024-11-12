import { Router } from "express";
import UserController from "./controllers/UserController";
import OfertaController from "./controllers/OfertaController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { testeController } from "./controllers/testeController";
import ContaController from "./controllers/ContaController";
import DespesaController from "./controllers/DespesaController";
import ReceitaController from "./controllers/ReceitaController";
import { EventoController } from "./controllers/EventoController";

const routes = Router();

//Public routes
routes.post("/user/login", new UserController().login);

routes.use(authMiddleware);

//User routes
routes.post("/user/register", new UserController().register);
routes.get("/user/profile", new UserController().getProfile);
routes.get("/user", new UserController().findAll);
routes.get("/user/:id", new UserController().findOne);
routes.put("/user/:id", new UserController().update);
routes.delete("/user/:id", new UserController().delete);

//Conta routes
routes.get("/conta", new ContaController().getConta);
routes.get("/conta/sum", new ContaController().getMonthlySums);
routes.get("/conta/month", new ContaController().getMonthBalance);

//Despesa routes
routes.post("/despesa", new DespesaController().create);
routes.delete("/despesa/:id", new DespesaController().delete);

//Eventos routes
routes.post("/evento", new EventoController().create);
routes.get("/evento/findAll", new EventoController().getAll);
routes.put("/evento/:id", new EventoController().update);
routes.delete("/evento/:id", new EventoController().delete);

//Receita routes
routes.post("/receita", new ReceitaController().create);
routes.delete("/receita/:id", new ReceitaController().delete);

//Oferta routes
routes.post("/oferta", new OfertaController().create);

//Teste routes
routes.get("/teste", new testeController().teste);

export default routes;
