import React, { useRef } from "react";
import "./styles/style.css";
import TableContainer from "../../components/PrintTable/TableContainer";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useSelector } from "react-redux";
import { showViewData } from "../../redux/dataSlice";
import { useNavigate } from "react-router-dom";

function PrintPage({}) {
  const viewData = useSelector(showViewData);

  const componentRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="print-page-container animate__animated animate__fadeIn">
      <div className="action-button">
        <button className="btn btn-danger m-1" onClick={() => navigate(-1)}>
          Back
        </button>
        <DownloadTableExcel
          filename="table"
          sheet={viewData[0].name}
          currentTableRef={componentRef.current}
        >
          <button className="btn btn-primary m-1">Export to Excel</button>
        </DownloadTableExcel>
      </div>
      <TableContainer printTable={componentRef} />
    </div>
  );
}

export default PrintPage;
