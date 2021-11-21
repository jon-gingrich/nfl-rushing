/**
 * Reads JSON input from data directory
 *
 * @returns {Promise.<Array.<PlayerRow>>}
 */
export const getPlayerData = async (): Promise<Array<PlayerRow>> => {
  const fs = require("fs");

  try {
    const buffer = await fs.promises.readFile("src/data/rushing.json");

    return JSON.parse(buffer.toString());
  } catch (err) {
    console.error("data.getPlayerData: ", { msg: err.message });
    throw err;
  }
};
