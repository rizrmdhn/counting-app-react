import React, { useEffect } from "react";
import Card from "./views/Card";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";
import { useSelector } from "react-redux";
import { isLoadingState } from "../../redux/dataSlice";
import Loader from "../Loader";

function Data({ lists, viewData }) {
  const isLoading = useSelector(isLoadingState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoading);
  }, []);

  return (
    <div className="data-container animate__animated animate__fadeIn">
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
        {isLoading === true ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Data;
