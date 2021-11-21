const app = require("../../../../app"); // Link to your server file
const request = require("supertest");

describe("/players endpoint", () => {
  require("../../../../controllers/players").getPlayerRows = jest.fn(
    (options: SSP) => {
      if (options.current.toString() === "100") {
        throw Error("invalid page");
      }

      return {
        records: [
          {
            Player: "Lance Dunbar",
            Team: "DAL",
            Pos: "RB",
            Att: 9,
            "Att/G": 0.7,
            Yds: 31,
            Avg: 3.4,
            "Yds/G": 2.4,
            TD: 1,
            Lng: "10",
            "1st": 3,
            "1st%": 33.3,
            "20+": 0,
            "40+": 0,
            FUM: 0,
          },
        ],
        totalRecords: 1,
      };
    }
  );

  it("should return player data", async () => {
    const res = await request(app).get("/api/v1/players").set({ "sc-page": 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      records: [
        {
          Player: "Lance Dunbar",
          Team: "DAL",
          Pos: "RB",
          Att: 9,
          "Att/G": 0.7,
          Yds: 31,
          Avg: 3.4,
          "Yds/G": 2.4,
          TD: 1,
          Lng: "10",
          "1st": 3,
          "1st%": 33.3,
          "20+": 0,
          "40+": 0,
          FUM: 0,
        },
      ],
      totalRecords: 1,
    });
  });

  it("should return 500 when error occurs", async () => {
    const res = await request(app)
      .get("/api/v1/players")
      .set({ "sc-page": 100 });

    expect(res.status).toBe(500);
  });
});

describe("/players/csv endpoint", () => {
  require("../../../../controllers/players").getPlayerCsvData = jest.fn(
    (options: SSP) => {
      if (options.property.toString() === "BadColumn") {
        throw Error("invalid page");
      }

      return {
        records: [
          {
            Player: "Lance Dunbar",
            Team: "DAL",
            Pos: "RB",
            Att: 9,
            "Att/G": 0.7,
            Yds: 31,
            Avg: 3.4,
            "Yds/G": 2.4,
            TD: 1,
            Lng: "10",
            "1st": 3,
            "1st%": 33.3,
            "20+": 0,
            "40+": 0,
            FUM: 0,
          },
        ],
        totalRecords: 1,
      };
    }
  );

  it("should return player data", async () => {
    const res = await request(app)
      .get("/api/v1/players/csv")
      .set({ "sc-sortcol": "Player" });

    expect(res.status).toBe(200);
    expect(res.text).toEqual(
      '{"records":[{"Player":"Lance Dunbar","Team":"DAL","Pos":"RB","Att":9,"Att/G":0.7,"Yds":31,"Avg":3.4,"Yds/G":2.4,"TD":1,"Lng":"10","1st":3,"1st%":33.3,"20+":0,"40+":0,"FUM":0}],"totalRecords":1}'
    );
  });

  it("should return 500 when error occurs", async () => {
    const res = await request(app)
      .get("/api/v1/players/csv")
      .set({ "sc-sortcol": "BadColumn" });

    expect(res.status).toBe(500);
  });
});
