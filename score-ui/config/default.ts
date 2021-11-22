import { IConfigApp } from "./constraint";

const config: IConfigApp = {
  appsettings: {
    rowsPerPage: 20,
    apis: {
      player: {
        host: "http://localhost:1234",
        baseUrl: "/api/v1",
        playerrows: "/players",
        csv: "/players/csv",
      },
    },
  },
};

module.exports = config;
