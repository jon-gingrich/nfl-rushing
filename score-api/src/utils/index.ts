/**
 *
 * @param {Array.<PlayerRow>} data player rows to sort
 * @param {string} property Object property to sort on
 * @param {number} order 1 or -1 for sort direction
 * @returns {Array.<PlayerRow>} sorted data
 */
const sortData = (
  data: Array<PlayerRow>,
  property: string,
  order: number
): Array<PlayerRow> => {
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
const filterData = (
  data: Array<PlayerRow>,
  filterColumn: string,
  filterMode: string,
  searchString: string
): Array<PlayerRow> => {
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

export { sortData, filterData };
