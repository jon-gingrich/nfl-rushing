import * as utils from "../../utils";

let options: SSP;

beforeEach(() => {
  options = {
    current: 0,
    filtercol: "",
    filtermode: "",
    filtersearch: "",
    offest: 0,
    order: 0,
    property: "",
    rows: 20,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("test getPlayerRows", () => {
  const testData = [
    {
      Player: "Joe Banyard",
      Team: "JAX",
      Pos: "RB",
      Att: 2,
      "Att/G": 2,
      Yds: 7,
      Avg: 3.5,
      "Yds/G": 7,
      TD: 0,
      Lng: "7",
      "1st": 0,
      "1st%": 0,
      "20+": 0,
      "40+": 0,
      FUM: 0,
    },
    {
      Player: "Shaun Hill",
      Team: "MIN",
      Pos: "QB",
      Att: 5,
      "Att/G": 1.7,
      Yds: 5,
      Avg: 1,
      "Yds/G": 1.7,
      TD: 0,
      Lng: "9",
      "1st": 0,
      "1st%": 0,
      "20+": 0,
      "40+": 0,
      FUM: 0,
    },
    {
      Player: "Breshad Perriman",
      Team: "BAL",
      Pos: "WR",
      Att: 1,
      "Att/G": 0.1,
      Yds: 2,
      Avg: 2,
      "Yds/G": 0.1,
      TD: 0,
      Lng: "2",
      "1st": 0,
      "1st%": 0,
      "20+": 0,
      "40+": 0,
      FUM: 0,
    },
  ];

  it("should return data and record count", async () => {
    const { getPlayerRows } = require("../players");

    require("../../data/index").getPlayerData = jest.fn(() => testData);

    const res = await getPlayerRows(options);

    expect(res).toEqual({ records: testData, totalRecords: 3 });
  });

  it("should return data with offset", async () => {
    const { getPlayerRows } = require("../players");

    require("../../data/index").getPlayerData = jest.fn(() => testData);

    options.offest = 1;

    const res = await getPlayerRows(options);

    expect(res).toEqual({
      records: [
        {
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          Att: 5,
          "Att/G": 1.7,
          Avg: 1,
          FUM: 0,
          Lng: "9",
          Player: "Shaun Hill",
          Pos: "QB",
          TD: 0,
          Team: "MIN",
          Yds: 5,
          "Yds/G": 1.7,
        },
        {
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          Att: 1,
          "Att/G": 0.1,
          Avg: 2,
          FUM: 0,
          Lng: "2",
          Player: "Breshad Perriman",
          Pos: "WR",
          TD: 0,
          Team: "BAL",
          Yds: 2,
          "Yds/G": 0.1,
        },
      ],
      totalRecords: 3,
    });
  });

  it("should return one row when one row/page indicated", async () => {
    const { getPlayerRows } = require("../players");

    require("../../data/index").getPlayerData = jest.fn(() => testData);

    options.rows = 1;

    const res = await getPlayerRows(options);

    expect(res).toEqual({
      records: [
        {
          Player: "Joe Banyard",
          Team: "JAX",
          Pos: "RB",
          Att: 2,
          "Att/G": 2,
          Yds: 7,
          Avg: 3.5,
          "Yds/G": 7,
          TD: 0,
          Lng: "7",
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          FUM: 0,
        },
      ],
      totalRecords: 3,
    });
  });

  it("should call sort when sort provided", async () => {
    const { getPlayerRows } = require("../players");

    require("../../utils/index").sortData = jest.fn(() => testData);

    const sortSpy = jest.spyOn(utils, "sortData");

    options.order = -1;
    options.property = "Lng";

    await getPlayerRows(options);

    expect(sortSpy).toHaveBeenCalledWith(testData, "Lng", -1);
  });

  it("should call filter when filter provided", async () => {
    const { getPlayerRows } = require("../players");

    require("../../utils/index").filterData = jest.fn(() => testData);

    const filterSpy = jest.spyOn(utils, "filterData");

    options.filtercol = "Player";
    options.filtersearch = "Joe";
    options.filtermode = "contains";

    await getPlayerRows(options);

    expect(filterSpy).toHaveBeenCalledWith(
      testData,
      "Player",
      "contains",
      "Joe"
    );
  });

  it("should not call sort when no sort order provided", async () => {
    const { getPlayerRows } = require("../players");

    const sortSpy = jest.spyOn(utils, "sortData");

    options.order = 0;

    await getPlayerRows(options);

    expect(sortSpy).not.toHaveBeenCalled();
  });

  it("should not call filter when no filter provided", async () => {
    const { getPlayerRows } = require("../players");

    const sortSpy = jest.spyOn(utils, "filterData");

    options.filtercol = "";

    await getPlayerRows(options);

    expect(sortSpy).not.toHaveBeenCalled();
  });

  it("should catch exception and log to console", async () => {
    const { getPlayerRows } = require("../players");

    console.error = jest.fn();

    try {
      require("../../data/index").getPlayerData = jest.fn(() => {
        throw Error("Unable to retrieve data");
      });

      await getPlayerRows(options);
    } catch (err) {
      expect(console.error).toHaveBeenCalledWith(
        "controllers.player.getPlayerRows: ",
        { msg: "Unable to retrieve data" }
      );
    }
  });
});

describe("test getPlayerCsvData", () => {
  const testData = [
    {
      Player: "Joe Banyard",
      Team: "JAX",
      Pos: "RB",
      Att: 2,
      "Att/G": 2,
      Yds: 7,
      Avg: 3.5,
      "Yds/G": 7,
      TD: 0,
      Lng: "7",
      "1st": 0,
      "1st%": 0,
      "20+": 0,
      "40+": 0,
      FUM: 0,
    },
    {
      Player: "Shaun Hill",
      Team: "MIN",
      Pos: "QB",
      Att: 5,
      "Att/G": 1.7,
      Yds: 5,
      Avg: 1,
      "Yds/G": 1.7,
      TD: 0,
      Lng: "9",
      "1st": 0,
      "1st%": 0,
      "20+": 0,
      "40+": 0,
      FUM: 0,
    },
    {
      Player: "Breshad Perriman",
      Team: "BAL",
      Pos: "WR",
      Att: 1,
      "Att/G": 0.1,
      Yds: 2,
      Avg: 2,
      "Yds/G": 0.1,
      TD: 0,
      Lng: "2",
      "1st": 0,
      "1st%": 0,
      "20+": 0,
      "40+": 0,
      FUM: 0,
    },
  ];

  it("should return data and record count", async () => {
    const { getPlayerCsvData } = require("../players");

    require("../../data/index").getPlayerData = jest.fn(() => testData);

    const res = await getPlayerCsvData(options);

    expect(res).toEqual(
      '"Player","Team","Pos","Att","Att/G","Yds","Avg","Yds/G","TD","Lng","1st","1st%","20+","40+","FUM"\n"Joe Banyard","JAX","RB","2","2","7","3.5","7","0","7","0","0","0","0","0"\n"Shaun Hill","MIN","QB","5","1.7","5","1","1.7","0","9","0","0","0","0","0"\n"Breshad Perriman","BAL","WR","1","0.1","2","2","0.1","0","2","0","0","0","0","0"'
    );
  });

  it("should call sort when sort provided", async () => {
    const { getPlayerCsvData } = require("../players");

    require("../../utils/index").sortData = jest.fn(() => testData);

    const sortSpy = jest.spyOn(utils, "sortData");

    options.order = -1;
    options.property = "Lng";

    await getPlayerCsvData(options);

    expect(sortSpy).toHaveBeenCalledWith(testData, "Lng", -1);
  });

  it("should call filter when filter provided", async () => {
    const { getPlayerCsvData } = require("../players");

    require("../../utils/index").filterData = jest.fn(() => testData);

    const filterSpy = jest.spyOn(utils, "filterData");

    options.filtercol = "Player";
    options.filtersearch = "Joe";
    options.filtermode = "contains";

    await getPlayerCsvData(options);

    expect(filterSpy).toHaveBeenCalledWith(
      testData,
      "Player",
      "contains",
      "Joe"
    );
  });

  it("should not call sort when no sort order provided", async () => {
    const { getPlayerCsvData } = require("../players");

    const sortSpy = jest.spyOn(utils, "sortData");

    options.order = 0;

    await getPlayerCsvData(options);

    expect(sortSpy).not.toHaveBeenCalled();
  });

  it("should not call filter when no filter provided", async () => {
    const { getPlayerCsvData } = require("../players");

    const sortSpy = jest.spyOn(utils, "filterData");

    options.filtercol = "";

    await getPlayerCsvData(options);

    expect(sortSpy).not.toHaveBeenCalled();
  });

  it("should catch exception and log to console", async () => {
    const { getPlayerCsvData } = require("../players");

    console.error = jest.fn();

    try {
      require("../../data/index").getPlayerData = jest.fn(() => {
        throw Error("Unable to retrieve data");
      });

      await getPlayerCsvData(options);
    } catch (err) {
      expect(console.error).toHaveBeenCalledWith(
        "controllers.player.getPlayerCsvData: ",
        { msg: "Unable to retrieve data" }
      );
    }
  });
});
