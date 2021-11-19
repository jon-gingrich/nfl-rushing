import React from "react";
import ReactDOM from "react-dom";
import Home from ".";

const rowsPerPage = window.rowsPerPage;
delete window.rowsPerPage;

/**
 * Inject server side rendered React
 */
ReactDOM.hydrate(
  <Home rowsPerPage={rowsPerPage} />,
  document.getElementById("root")
);
