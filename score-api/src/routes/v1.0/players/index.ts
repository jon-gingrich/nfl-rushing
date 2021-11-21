import express from "express";

import { header } from "express-validator";
import validateRequest from "../../../middleware/validateRequest";

import { getPlayerRows, getPlayerCsvData } from "../../../controllers/players";

import HEADERS from "../../../constants/headers";

const players = express.Router();

const validationRules = [
  header(HEADERS.PAGE).optional().isFloat({ min: 0 }),
  header(HEADERS.FIRST).optional().isFloat({ min: 0 }),
  header(HEADERS.SORTORDER)
    .optional()
    .matches(/\b(1|-1)\b/),
  header(HEADERS.SCORTCOL).optional().isString(),
  header(HEADERS.ROWS).optional().isFloat({ min: 0 }),
  header(HEADERS.FILTERCOL).optional().isString(),
  header(HEADERS.FILTERMODE)
    .optional()
    .matches(/\b(startsWith|endsWith|contains|notContains|equals|notEquals)\b/),
  header(HEADERS.FILTERTERM).optional(),
];

players.get("/", validationRules, validateRequest, async (req, res) => {
  try {
    const sspData = req.headers;

    const result = await getPlayerRows({
      current: sspData[HEADERS.PAGE],
      offest: sspData[HEADERS.FIRST],
      order: sspData[HEADERS.SORTORDER],
      property: sspData[HEADERS.SCORTCOL],
      rows: sspData[HEADERS.ROWS],
      filtercol: sspData[HEADERS.FILTERCOL],
      filtermode: sspData[HEADERS.FILTERMODE],
      filtersearch: sspData[HEADERS.FILTERTERM],
    });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send("Unable to retrieve player data");
  }
});

players.get("/csv", validationRules, validateRequest, async (req, res) => {
  try {
    const sspData = req.headers;

    const result = await getPlayerCsvData({
      order: sspData[HEADERS.SORTORDER],
      property: sspData[HEADERS.SCORTCOL],
      filtercol: sspData[HEADERS.FILTERCOL],
      filtermode: sspData[HEADERS.FILTERMODE],
      filtersearch: sspData[HEADERS.FILTERTERM],
      offest: null,
      current: null,
      rows: null,
    });

    res.set("Content-Type", "text/csv");

    return res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Unable to retrieve csv data");
  }
});

export default players;
