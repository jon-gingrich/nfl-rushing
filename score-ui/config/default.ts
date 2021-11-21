import { IConfigApp } from "./constraint";

const config: IConfigApp = {
  appsettings: {
    rowsPerPage: 20,
    apis: {
      player: {
        host: "http://localhost:1234",
        base: "/api/v1",
        playerrows: "/players",
        csv: "/players/csv",
      },
    },
  },
};

module.exports = config;
