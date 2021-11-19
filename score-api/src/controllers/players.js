/**
 * @typedef SSP
 * @type {Object}
 * @property {number} offest Rows to offset
 * @property {number} rows Total number of rows to return
 * @property {number} current Current page
 * @property {string} order Sort order
 * @property {string} property Property to sort on
 * @property {string} filtercol Property to sort on
 * @property {string} filtermode Property to sort on
 * @property {string} filtersearch Property to sort on
 */

/**
 * @typedef PlayerData
 * @type {Object}
 * @property {number} totalRecords total rows from data source
 * @property {Array.<PlayerRow>} records Player records to return
 */

/**
 * @typedef {{
 * "Player": string,
 * "Att/G": string,
 * "Att": string,
 * "Yds": string,
 * "Avg": string,
 * "Yds/G": string,
 * "TD": string,
 * "Lng": string,
 * "1st": string,
 * "1st%": string,
 * "20+": string,
 * "40+": string,
 * "FUM": string
 * }}
 */
let PlayerRow;

/**
 *
 * @param {SSP} options For Server side Pagination
 * @returns {Promise.<PlayerData>} player rows with total count if all records not requested
 */
const getPlayerRows = async (options) => {
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

    if (options.offest) {
      data = data.slice(options.offest, options.offest + Number(options.rows));
    } else if (options.rows) {
      data = data.slice(0, options.rows);
    }

    return {
      totalRecords,
      records: data,
    };
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {SSP} options filtering and sorting options to apply
 * @returns {Promise.<string>} comma separated values with first row being headers
 */
const getPlayerCsvData = async (options) => {
  let data = await getPlayerData();

  if (options.order) {
    data = sortData(data);
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
};

/**
 * Reads JSON input from data directory
 *
 * @returns {Promise.<Array.<PlayerRow>>}
 */
const getPlayerData = async () => {
  const fs = require("fs");

  const buffer = await fs.promises.readFile("src/data/rushing.json");

  return JSON.parse(buffer.toString());
};

/**
 *
 * @param {Array.<PlayerRow>} data player rows to sort
 * @param {string} property Object property to sort on
 * @param {number} order 1 or -1 for sort direction
 * @returns
 */
const sortData = (data, property, order) => {
  return data.sort((a, b) => {
    return order == 1
      ? Number(a[property].toString().replace(/[A-Za-z]/g, "")) -
          Number(b[property].toString().replace(/[A-Za-z]/g, ""))
      : Number(b[property].toString().replace(/[A-Za-z]/g, "")) -
          Number(a[property].toString().replace(/[A-Za-z]/g, ""));
  });
};

/**
 *
 * @param {Array.<PlayerRow>} data data to filter
 * @param {string} filterColumn Property to filter on
 * @param {string} filterMode Filter mode
 * @param {string} searchString String to search for
 * @returns {Array.<PlayerRow>} Filtered data
 */
const filterData = (data, filterColumn, filterMode, searchString) => {
  const filterSearch = searchString.toLowerCase();

  switch (filterMode) {
    case "startsWith":
      data = data.filter((x) =>
        x[filterColumn].toLowerCase().startsWith(filterSearch)
      );
      break;
    case "endsWith":
      data = data.filter((x) =>
        x[filterColumn].toLowerCase().endsWith(filterSearch)
      );
      break;
    case "contains":
      data = data.filter((x) =>
        x[filterColumn].toLowerCase().includes(filterSearch)
      );
      break;
    case "notContains":
      data = data.filter(
        (x) => !x[filterColumn].toLowerCase().includes(filterSearch)
      );
      break;

    case "equals":
      data = data.filter((x) => x[filterColumn].toLowerCase() === filterSearch);
      break;
    case "notEquals":
      data = data.filter((x) => x[filterColumn].toLowerCase() !== filterSearch);
      break;
  }

  return data;
};

export { getPlayerCsvData, getPlayerRows };
