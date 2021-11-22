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

interface PlayerData {
  totalRecords: number;
  records: Array<PlayerRow>;
}

interface SSP {
  offset: number;
  rows: number;
  current: number;
  order: number;
  property: string;
  filtercol: string;
  filtermode: string;
  filtersearch: string;
}
