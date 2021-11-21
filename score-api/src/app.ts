import express from "express";
import api from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

const app = express();

//app.disable("x-powered-by");
//app.use(express.json());/
//app.use(express.urlencoded({ extended: true }));

//app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//app.use("/$", (req, res) => {
// res.redirect(302, "/docs");
//});

/*app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});*/

app.use("/api", api);

module.exports = app;
