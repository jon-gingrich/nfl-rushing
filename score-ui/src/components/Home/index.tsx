import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import {
  DataTable,
  DataTableSortParams,
  DataTableFilterParams,
  DataTablePageParams,
} from "primereact/datatable";
import { Column } from "primereact/column";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCsvData, getPlayerData } from "../../controllers";
import { LazyParams, PlayerRow } from "../../types/types";

const Home = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [playerData, setPlayerData] = useState<Array<PlayerRow>>(null);
  const [lazyParams, setLazyParams] = useState<LazyParams>({
    first: 0,
    rows: 20,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: null,
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]);

  const loadLazyData = async () => {
    setLoading(true);
    const data = await getPlayerData(lazyParams);
    if (data) {
      setTotalRecords(data.totalRecords);
      setPlayerData(data.records);
    } else {
      toast.error("Failed to download stats, please try again later");
    }
    setLoading(false);
  };

  const onPage = (event: DataTablePageParams) => {
    let _lazyParams = { ...lazyParams, ...event };
    setLazyParams(_lazyParams);
  };

  const onSort = (event: DataTableSortParams) => {
    let _lazyParams = { ...lazyParams, ...event };
    setLazyParams(_lazyParams);
  };

  const onFilter = (event: DataTableFilterParams) => {
    let _lazyParams = { ...lazyParams, ...event };
    _lazyParams["first"] = 0;
    setLazyParams(_lazyParams);
  };

  const downloadCsv = async () => {
    const data = await getCsvData(lazyParams);

    if (data) {
      const tempDownloadLink = document.createElement("a");
      tempDownloadLink.href = "data:text/csv;charset=utf-8," + encodeURI(data);
      tempDownloadLink.target = "_blank";
      tempDownloadLink.download = "playerStats.csv";
      tempDownloadLink.click();
      tempDownloadLink.remove();
    } else {
      toast.error("CSV Download failed, try again");
    }
  };

  const paginatorRight = (
    <button className="csv-button" onClick={() => downloadCsv()} />
  );

  return (
    <div>
      <div className="card">
        <DataTable
          value={playerData}
          lazy
          filterDisplay="row"
          paginator
          first={lazyParams.first}
          rows={props.rowsPerPage}
          totalRecords={totalRecords}
          onPage={onPage}
          onSort={onSort}
          sortField={lazyParams.sortField}
          sortOrder={lazyParams.sortOrder}
          onFilter={onFilter}
          filters={lazyParams.filters}
          loading={loading}
          paginatorRight={paginatorRight}
        >
          <Column
            field="Player"
            header="Player"
            filter
            filterPlaceholder="Search by Player name"
          />
          <Column field="Team" header="Team" />
          <Column field="Pos" header="Pos" />
          <Column field="Att/G" header="Att/G" />
          <Column field="Att" header="Att" />
          <Column field="Yds" header="Yds" />
          <Column field="Avg" header="Avg" />
          <Column field="Yds/G" sortable header="Yds/G" />
          <Column field="TD" sortable header="TD" />
          <Column field="Lng" sortable header="Lng" />
          <Column field="1st" header="1st" />
          <Column field="1st%" header="1st%" />
          <Column field="20+" header="20+" />
          <Column field="40+" header="40+" />
          <Column field="FUM" header="FUM" />
        </DataTable>
      </div>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        autoClose={2000}
      />
    </div>
  );
};

export default Home;
