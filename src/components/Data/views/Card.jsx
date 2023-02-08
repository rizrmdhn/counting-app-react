import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchViewData } from "../../../redux/dataSlice";
import "./styles/styles.css";

function Card({ name, year, item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchViewData(item.id));
    navigate(`/acara/${item.id}/kegiatan`);
  };
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{year}</h6>
      </div>
    </div>
  );
}

export default Card;
