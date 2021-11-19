import express from "express";
import api from "./routes";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/$", (req, res) => {
  res.redirect(302, "/docs");
});

app.use("/api", api);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.info(
    `\x1b[32mscore-api\x1b[0m running at \x1b[4m\x1b[33mhttp://localhost:${port}\x1b[0m`
  );
});
