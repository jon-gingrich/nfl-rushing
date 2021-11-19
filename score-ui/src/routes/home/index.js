import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "../../components/Home";

import config from "config";
const appSettings = config.get("appsettings");

const home = express.Router();

/**
 * Route to send rendered react component to client.
 *
 */
home.get("/", async (req, res) => {
  const content = renderToString(<Home />);

  const htmlToSend = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>theScore "the Rush"</title>
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <div id="root">${content}</div>

      <!-- Added to show icons in the editor -->
      <link
        rel="stylesheet"
        href="https://unpkg.com/primeicons@5.0.0/primeicons.css"
      />
      <script> window.rowsPerPage=${appSettings.rowsPerPage}</script>
      <script src="/main.js"></script>
    </body>
  </html>
    `;

  return res.send(htmlToSend);
});

export default home;
