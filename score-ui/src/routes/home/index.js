import express from "express";
import axios from "axios";

const home = express.Router();

home.get("/players", async (req, res) => {
  const ssp = req.headers;

  try {
    const results = await axios.get("http://localhost:1234/api/v1/players", {
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

  try {
    const results = await axios.get(
      "http://localhost:1234/api/v1/players/csv",
      {
        headers: {
          ...(ssp.sortorder && { "sc-sortorder": ssp.sortorder }),
          ...(ssp.sortfield && { "sc-sortcol": ssp.sortfield }),
          "sc-filtercol": ssp.filtercol,
          "sc-filtermode": ssp.matchmode,
          "sc-filterterm": ssp.filterterm,
        },
      }
    );

    return res.status(200).send(results.data);
  } catch (err) {
    console.error("err: ", err);
  }
});

export default home;
