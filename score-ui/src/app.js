import express from "express";
import compression from "compression";

import home from "./routes/home";
import api from "./routes/api";

const app = express();

app.use(compression());
app.use(express.json());
app.disable("x-powered-by");
app.use(express.static("dist"));
app.use("/home", home);
app.use("/home/api", api);
module.exports = app;
