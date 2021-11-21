export interface IConfigApp {
  appsettings: {
    rowsPerPage: number;
    apis: {
      player: {
        host: string;
        base: string;
        playerrows: string;
        csv: string;
      };
    };
  };
}
