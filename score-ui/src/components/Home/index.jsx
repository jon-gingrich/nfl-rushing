import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import csvDownload from "../../../public/csv-24.png";

import { getCsvData, getPlayerData } from "../../controllers";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [customers, setPlayerData] = useState(null);

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 20,
    page: 1,
    filters: {
      Player: { value: "", matchMode: "contains" },
    },
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]);

  const loadLazyData = async () => {
    setLoading(true);
    const data = await getPlayerData(lazyParams);
    setTotalRecords(data.totalRecords);
    setPlayerData(data.records);
    setLoading(false);
  };

  const onPage = (event) => {
    let _lazyParams = { ...lazyParams, ...event };
    setLazyParams(_lazyParams);
  };

  const onSort = (event) => {
    let _lazyParams = { ...lazyParams, ...event };
    setLazyParams(_lazyParams);
  };

  const onFilter = (event) => {
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
    <img
      src={csvDownload}
      alt="Download data in CSV"
      onClick={() => downloadCsv(lazyParams)}
    />
  );

  return (
    <div>
      <div className="card">
        <DataTable
          value={customers}
          lazy
          filterDisplay="row"
          responsiveLayout="scroll"
          paginator
          first={lazyParams.first}
          rows={20}
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
