import React, { useEffect, useState } from "react";
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

  const [editMode, setEditMode] = useState(false);

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

  const handleEditKegiatan = () => {
    setEditMode(!editMode);
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
            <EditButton editKegiatan={() => handleEditKegiatan()} />
            <AddButton addKegiatan={() => handleAddKegiatan()} />
          </div>
          <div className="tg-wrap">
            {viewData.map((item) => (
              <table className="tg animate__animated animate__fadeIn" key={item.id}>
                <Table key={item.id} item={item} editMode={editMode} />
              </table>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TableContainer;
