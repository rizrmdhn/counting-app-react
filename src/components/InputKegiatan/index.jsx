import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addKegiatan } from "../../redux/dataSlice";
import "./styles/styles.css";

function InputKegiatan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tahunKegiatan, setTahunKegiatan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const acaraId = window.localStorage.getItem("acaraId");
    dispatch(addKegiatan({ namaKegiatan, tahunKegiatan, acaraId }));
    window.localStorage.removeItem("acaraId");
    navigate("/acara");
  };

  return (
    <div className="input-data-kegiatan">
      <form>
        <div className="mb-3">
          <label htmlFor="namaKegiatan" className="form-label">
            Nama Kegiatan
          </label>
          <input
            type="text"
            className="form-control"
            id="namaKegiatan"
            aria-describedby="namaKegiatan"
            value={namaKegiatan}
            onChange={(e) => setNamaKegiatan(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tahunKegiatan" className="form-label">
            Tahun Kegiatan
          </label>
          <input
            type="number"
            className="form-control"
            id="tahunKegiatan"
            value={tahunKegiatan}
            onChange={(e) => setTahunKegiatan(parseInt(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputKegiatan;