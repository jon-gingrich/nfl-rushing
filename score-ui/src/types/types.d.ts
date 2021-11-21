import {
  DataTableFilterMeta,
  DataTableSortOrderType,
} from "primereact/datatable";

interface LazyParams {
  first: number;
  rows: number;
  page: number;
  sortField: string;
  sortOrder: DataTableSortOrderType;
  filters: DataTableFilterMeta;
}

interface Window {
  rowsPerPage: number;
}

interface PlayerData {
  totalRecords: number;
  records: Array<PlayerRow>;
}

interface PlayerRow {
  Player: string;
  "Att/G": string;
  Att: string;
  Yds: string;
  Avg: string;
  "Yds/G": string;
  TD: string;
  Lng: string;
  "1st": string;
  "1st%": string;
  "20+": string;
  "40+": string;
  FUM: string;
}

declare global {
  interface Window {
    rowsPerPage: number;
  }
}
