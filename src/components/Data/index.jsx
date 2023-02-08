import React from "react";
import Card from "./views/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import "./styles/style.css"

const MySwal = withReactContent(Swal);

function Data({ lists, viewData }) {
  const navigate = useNavigate();

  return (
    <div className="data-container">
      <div className="data-menu">
        <div className="data-menu-item">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/data/add")}
          >
            Add Data
          </button>
        </div>
      </div>
      <div className="data-item-lists">
        {lists.length !== 0 ? (
          lists.map((item) => (
            <Card
              key={item.id}
              item={item}
              name={item.name}
              year={item.year}
              viewData={viewData}
            />
          ))
        ) : (
          <div className="no-data">No Data</div>
        )}
      </div>
    </div>
  );
}

export default Data;
