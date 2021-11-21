describe("test getPlayerData", () => {
  it("should return data", async () => {
    const { getPlayerData } = require("..");

    const fsmock = require("mock-fs");

    fsmock({
      "src/data/rushing.json": `[
        {
          "Player": "Joe Banyard",
          "Team": "JAX",
          "Pos": "RB",
          "Att": 2,
          "Att/G": 2,
          "Yds": 7,
          "Avg": 3.5,
          "Yds/G": 7,
          "TD": 0,
          "Lng": "7",
          "1st": 0,
          "1st%": 0,
          "20+": 0,
          "40+": 0,
          "FUM": 0
        }
      ]`,
    });

    const result = await getPlayerData();
    fsmock.restore();

    expect(result).toEqual([
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
    ]);
  });

  it("should log exception", async () => {
    const { getPlayerData } = require("..");

    console.error = jest.fn();

    const fsmock = require("mock-fs");

    fsmock({
      "src/data/rushing.json": `bad json`,
    });

    try {
      await await getPlayerData();
    } catch (err) {
      fsmock.restore();
      expect(console.error).toHaveBeenCalledWith("data.getPlayerData: ", {
        msg: "Unexpected token b in JSON at position 0",
      });
    }
  });
});
