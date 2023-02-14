import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { showViewData } from "../../redux/dataSlice";
import "./styles/style.css";
import Table from "./views/Table";

function TableContainer({ printTable }) {
  const viewData = useSelector(showViewData);

  useEffect(() => {
    console.log(viewData);
  }, []);

  return (
    <div className="tg-wrap-print" ref={printTable}>
      <table className="tg-print">
        {viewData.map((item) => (
          <Table key={item.id} item={item} />
        ))}
      </table>
    </div>
  );
}

export default TableContainer;
