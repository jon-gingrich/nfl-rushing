import axios from "axios";

/**
 *
 * @param {lazyParams} options sorting/filtinering options
 * @returns player rows and total count
 */
const getCsvData = async (options) => {
  try {
    const result = await axios.get("/home/api/players/csv", {
      headers: {
        ...(options.sortField && { sortfield: options.sortField }),
        ...(options.sortOrder && { sortorder: options.sortOrder }),
        filtercol: "Player",
        filterterm: options.filters.Player.value,
        matchmode: options.filters.Player.matchMode,
      },
    });

    return result.data;
  } catch (error) {
    console.log("getCsvData error: ", error);
    return null;
  }
};

/**
 *
 * @param {lazyParams} options sorting/filtinering options
 * @returns player rows and total count
 */
const getPlayerData = async (options) => {
  try {
    const result = await axios.get("/home/api/players", {
      headers: {
        first: options.first,
        rows: options.rows,
        page: options.page,
        ...(options.sortField && { sortfield: options.sortField }),
        ...(options.sortOrder && { sortorder: options.sortOrder }),
        filtercol: "Player",
        filterterm: options.filters.Player.value,
        matchmode: options.filters.Player.matchMode,
      },
    });

    return result.data;
  } catch (error) {
    console.log("getPlayerData error: ", error);
    return null;
  }
};

export { getCsvData, getPlayerData };
