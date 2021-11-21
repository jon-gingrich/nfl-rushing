import axios from "axios";
import { DataTableFilterMetaData } from "primereact/datatable";
import { LazyParams } from "../types/types";

/**
 *
 * @param {lazyParams} options sorting/filtinering options
 * @returns player rows and total count
 */
const getCsvData = async (options: LazyParams) => {
  try {
    const result = await axios.get("home/api/players/csv", {
      headers: {
        ...(options.sortField && { sortfield: options.sortField.toString() }),
        ...(options.sortOrder && { sortorder: options.sortOrder.toString() }),
        filtercol: "Player",
        filterterm:
          (options.filters?.Player as DataTableFilterMetaData)?.value || "",
        matchmode:
          (options.filters?.Player as DataTableFilterMetaData)?.matchMode ||
          "contains",
      },
    });

    return result.data;
  } catch (err) {
    console.error("controllers.getCsvData: ", { msg: err.msg });
    return null;
  }
};

/**
 *
 * @param {lazyParams} options sorting/filtinering options
 * @returns player rows and total count
 */
const getPlayerData = async (options: LazyParams) => {
  try {
    const result = await axios.get("home/api/players", {
      headers: {
        first: options.first.toString(),
        rows: options.rows.toString(),
        page: options.page.toString(),
        ...(options.sortField && { sortfield: options.sortField.toString() }),
        ...(options.sortOrder && { sortorder: options.sortOrder.toString() }),
        filtercol: "Player",
        filterterm:
          (options.filters?.Player as DataTableFilterMetaData)?.value || "",
        matchmode:
          (options.filters?.Player as DataTableFilterMetaData)?.matchMode ||
          "contains",
      },
    });

    return result.data;
  } catch (err) {
    console.error("controllers.getPlayerData: ", { msg: err.msg });

    return null;
  }
};

export { getCsvData, getPlayerData };
