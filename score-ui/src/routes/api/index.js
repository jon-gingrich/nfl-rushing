import express from "express";
import axios from "axios";

import config from "config";
const appSettings = config.get("appsettings.apis.player");

const home = express.Router();

home.get("/players", async (req, res) => {
  const ssp = req.headers;

  const url = `${appSettings.host}${appSettings.base}${appSettings.playerrows}`;

  try {
    const results = await axios.get(url, {
      headers: {
        "sc-first": ssp.first,
        "sc-rows": ssp.rows,
        "sc-page": ssp.page,
        ...(ssp.sortorder && { "sc-sortorder": ssp.sortorder }),
        ...(ssp.sortfield && { "sc-sortcol": ssp.sortfield }),
        "sc-filtercol": ssp.filtercol,
        "sc-filtermode": ssp.matchmode,
        "sc-filterterm": ssp.filterterm,
      },
    });

    return res.status(200).send(results.data);
  } catch (err) {
    console.error("err: ", err);
  }
});

home.get("/players/csv", async (req, res) => {
  const ssp = req.headers;

  const url = `${appSettings.host}${appSettings.base}${appSettings.csv}`;

  try {
    const results = await axios.get(url, {
      headers: {
        ...(ssp.sortorder && { "sc-sortorder": ssp.sortorder }),
        ...(ssp.sortfield && { "sc-sortcol": ssp.sortfield }),
        "sc-filtercol": ssp.filtercol,
        "sc-filtermode": ssp.matchmode,
        "sc-filterterm": ssp.filterterm,
      },
    });

    return res.status(200).send(results.data);
  } catch (err) {
    console.error("err: ", err);
  }
});

export default home;