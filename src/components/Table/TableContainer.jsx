import React, { useEffect } from "react";
import Table from "./views/Table";
import "./styles/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddButton from "../Button/AddButton";
import EditButton from "../Button/EditButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchViewData, isLoadingState } from "../../redux/dataSlice";
import Loader from "../Loader";

function TableContainer({ viewData }) {
  const isLoading = useSelector(isLoadingState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (viewData.length === 0) {
      const id = location.pathname.split("/")[2];
      dispatch(fetchViewData(id));
    } else {
      return;
    }
  }, []);
  const handleAddKegiatan = () => {
    const acaraId = viewData[0].id;
    window.localStorage.setItem("acaraId", acaraId);
    navigate("/data/add-kegiatan");
  };

  return (
    <div className="table-container">
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <div className="table-title">
            <h1>{viewData.name}</h1>
          </div>
          <div className="action-button">
            <EditButton editKegiatan={() => console.log("this works")} />
            <AddButton addKegiatan={() => handleAddKegiatan()} />
          </div>
          <div className="tg-wrap">
            {viewData.map((item) => (
              <Table key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TableContainer;
