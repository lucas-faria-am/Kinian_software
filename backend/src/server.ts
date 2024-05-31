import "express-async-errors";
import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/erro";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;

app.use(routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
