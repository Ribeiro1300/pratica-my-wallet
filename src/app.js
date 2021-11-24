import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController.js";
import * as financialController from "./controllers/financialController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signup);

app.post("/sign-in", userController.signin);

app.post("/financial-events", financialController.postFinancialEvent);

app.get("/financial-events", financialController.getFinancialEvent);

app.get("/financial-events/sum", financialController.sumFinancialEvents);

export default app;
