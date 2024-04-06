import "express-async-errors";
import Express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/erro";

const app = Express();
app.use(Express.json());
const PORT = 8000;

app.use(routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
