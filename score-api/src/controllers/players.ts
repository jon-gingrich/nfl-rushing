import { getPlayerData } from "../data";
import { filterData, sortData } from "../utils";

/**
 *
 * @param {SSP} options For Server side Pagination
 * @returns {Promise.<PlayerData>} player rows with total count if all records not requested
 */
const getPlayerRows = async (options: SSP): Promise<PlayerData> => {
  try {
    let data = await getPlayerData();

    if (options.order) {
      data = sortData(data, options.property, options.order);
    }

    if (options.filtercol && options.filtersearch) {
      data = filterData(
        data,
        options.filtercol,
        options.filtermode,
        options.filtersearch
      );
    }

    const totalRecords = data.length;

    data = data.slice(options.offset, options.offset + options.rows);

    return {
      totalRecords,
      records: data,
    };
  } catch (err) {
    console.error("controllers.player.getPlayerRows: ", { msg: err.message });
    throw err;
  }
};

/**
 *
 * @param {SSP} options filtering and sorting options to apply
 * @returns {Promise.<string>} comma separated values with first row being headers
 */
const getPlayerCsvData = async (options: SSP): Promise<string> => {
  try {
    let data = await getPlayerData();

    if (options.order && options.property) {
      data = sortData(data, options.property, options.order);
    }

    if (options.filtercol && options.filtersearch) {
      data = filterData(
        data,
        options.filtercol,
        options.filtermode,
        options.filtersearch
      );
    }

    let csvData = Object.keys(data[0])
      .map((entry) => `"${entry}"`)
      .join(",")
      .concat("\n");

    csvData += data
      .map((player) =>
        Object.values(player)
          .map((entry) => `"${entry}"`)
          .join(",")
      )
      .join("\n");

    return csvData;
  } catch (err) {
    console.error("controllers.player.getPlayerCsvData: ", {
      msg: err.message,
    });
    throw err;
  }
};

export { getPlayerCsvData, getPlayerRows };
