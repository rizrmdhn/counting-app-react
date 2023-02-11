import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAcara, fetchViewData } from "../../../redux/dataSlice";
import "./styles/styles.css";

function Card({ name, year, item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e, item) => {
    if (e.target.className.includes("edit-btn")) {
      window.localStorage.setItem("editData", JSON.stringify(item));
      navigate(`/data/${item.id}/edit`);
    } else if (e.target.className.includes("delete-btn")) {
      dispatch(deleteAcara(item.id));
    } else {
      dispatch(fetchViewData(item.id));
      navigate(`/acara/${item.id}/kegiatan`);
    }
  };

  return (
    <div className="card" onClick={(e) => handleClick(e, item)}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{year}</h6>
        <div className="card-actions">
          <button className="edit-btn bi bi-pencil-square"></button>
          <button className="delete-btn bi bi-trash"></button>
        </div>
      </div>
    </div>
  );
}

export default Card;
