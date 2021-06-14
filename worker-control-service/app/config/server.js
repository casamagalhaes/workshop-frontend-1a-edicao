import express from "express";
import { json } from "body-parser";
import morgan from "morgan";
import cors from "cors";

import * as funcionarios from "../controller/funcionarioRoutes";

export const app = express();

app.use(json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use(funcionarios.router);

app.get("/status", (req, res) => res.send("ONLINE"));
