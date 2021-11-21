describe("test sortData", () => {
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

  it("should sort data asc based on Lng", () => {
    const { sortData } = require("..");

    const result = sortData(testData, "Lng", 1);

    const lgnValues = result.map((p) => p.Lng);

    expect(lgnValues).toEqual(["2", "7", "9"]);
  });

  it("should sort data desc based on Lng", () => {
    const { sortData } = require("..");

    const result = sortData(testData, "Lng", -1);

    const lgnValues = result.map((p) => p.Lng);

    expect(lgnValues).toEqual(["9", "7", "2"]);
  });
});

describe("test filterData", () => {
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
  ];

  it("should return players with name containing Joe", () => {
    const { filterData } = require("..");

    const result = filterData(testData, "Player", "contains", "Joe");

    expect(result).toEqual([testData[0]]);
  });

  it("should return players with name ending with man", () => {
    const { filterData } = require("..");

    const result = filterData(testData, "Player", "endsWith", "man");

    expect(result).toEqual([testData[2]]);
  });

  it("should return players with name starts with Sha", () => {
    const { filterData } = require("..");

    const result = filterData(testData, "Player", "startsWith", "sha");

    expect(result).toEqual([testData[1]]);
  });

  it("should return players with name not containing yard", () => {
    const { filterData } = require("..");

    const result = filterData(testData, "Player", "notContains", "yard");

    expect(result).toEqual([testData[1], testData[2], testData[3]]);
  });

  it("should return players with name equals Lance Dunbar", () => {
    const { filterData } = require("..");

    const result = filterData(testData, "Player", "equals", "Lance Dunbar");

    expect(result).toEqual([testData[3]]);
  });

  it("should return players with name not equaling Lance Dunbar", () => {
    const { filterData } = require("..");

    const result = filterData(testData, "Player", "notEquals", "Lance Dunbar");

    expect(result).toEqual([testData[0], testData[1], testData[2]]);
  });
});
