export interface IConfigApp {
  appsettings: {
    rowsPerPage: number;
    apis: {
      player: {
        host: string;
        baseUrl: string;
        playerrows: string;
        csv: string;
      };
    };
  };
}
