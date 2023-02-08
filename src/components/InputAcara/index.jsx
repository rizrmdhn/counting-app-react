import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAcara } from "../../redux/dataSlice";
import "./styles/styles.css";

function InputAcara() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [namaAcara, setNamaAcara] = useState("");
  const [tahunAcara, setTahunAcara] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAcara({ namaAcara, tahunAcara }));
    navigate("/acara");
  };

  return (
    <div className="input-data-acara">
      <form>
        <div className="mb-3">
          <label htmlFor="namaAcara" className="form-label">
            Nama Acara
          </label>
          <input
            type="text"
            className="form-control"
            id="namaAcara"
            aria-describedby="namaAcara"
            value={namaAcara}
            onChange={(e) => setNamaAcara(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tahunAcara" className="form-label">
            Tahun Acara
          </label>
          <input
            type="number"
            className="form-control"
            id="tahunAcara"
            value={tahunAcara}
            onChange={(e) => setTahunAcara(parseInt(e.target.value))}
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

export default InputAcara;
