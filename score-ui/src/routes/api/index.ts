import express from "express";
import axios, { AxiosRequestHeaders } from "axios";
import { config } from "../../config.service";

const home = express.Router();

home.get("/players", async (req, res) => {
  const ssp = req.headers;

  const { player } = config.getTyped("appsettings").apis;

  const url = `${player.host}${player.base}${player.playerrows}`;

  try {
    const results = await axios.get(url, {
      headers: {
        scfirst: ssp.first,
        "sc-rows": ssp.rows,
        "sc-page": ssp.page,
        ...(ssp.sortorder && { "sc-sortorder": ssp.sortorder }),
        ...(ssp.sortfield && { "sc-sortcol": ssp.sortfield }),
        "sc-filtercol": ssp.filtercol,
        "sc-filtermode": ssp.matchmode || "",
        "sc-filterterm": ssp.filterterm,
      } as AxiosRequestHeaders,
    });

    return res.status(200).send(results.data);
  } catch (err) {
    console.error("routes.api.players: ", { msg: err.msg });
  }
});

home.get("/players/csv", async (req, res) => {
  const ssp = req.headers;

  const { player } = config.getTyped("appsettings").apis;

  const url = `${player.host}${player.base}${player.csv}`;

  try {
    const results = await axios.get(url, {
      headers: {
        ...(ssp.sortorder && { "sc-sortorder": ssp.sortorder }),
        ...(ssp.sortfield && { "sc-sortcol": ssp.sortfield }),
        "sc-filtercol": ssp.filtercol,
        "sc-filtermode": ssp.matchmode,
        "sc-filterterm": ssp.filterterm,
      } as AxiosRequestHeaders,
    });

    return res.status(200).send(results.data);
  } catch (err) {
    console.error("routes.api.csv: ", { msg: err.msg });
  }
});

export default home;
