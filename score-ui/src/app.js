import express from "express";
import compression from "compression";

import home from "./routes/home";

const app = express();

app.use(compression());
app.use(express.json());
app.disable("x-powered-by");

app.use("/home", express.static("dist"));
app.use("/home/api", home);
module.exports = app;
