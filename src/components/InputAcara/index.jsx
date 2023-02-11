import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addAcara, editAcara } from "../../redux/dataSlice";
import "./styles/styles.css";

function InputAcara() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [namaAcara, setNamaAcara] = useState("");
  const [tahunAcara, setTahunAcara] = useState("");

  useEffect(() => {
    if (location.pathname !== `/data/add`) {
      const editData = window.localStorage.getItem("editData");
      if (editData) {
        const data = JSON.parse(editData);
        setNamaAcara(data.name);
        setTahunAcara(data.year);
      } else {
        setNamaAcara("");
        setTahunAcara("");
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editData = window.localStorage.getItem("editData");
    if (location.pathname === `/data/add`) {
      dispatch(
        addAcara({
          namaAcara,
          tahunAcara,
        })
      );
      navigate("/acara");
    } else {
      const data = JSON.parse(editData);
      dispatch(
        editAcara({
          id: data.id,
          namaAcara,
          tahunAcara,
        })
      );
      navigate("/acara");
    }
  };

  const handleBack = () => {
    navigate(-1);
    window.localStorage.removeItem("editData");
  };

  return (
    <div className="input-data-acara animate__animated animate__fadeIn">
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
        <div className="action-button">
          <button
            type="button"
            className="btn-back btn btn-danger"
            onClick={() => handleBack()}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-submit btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputAcara;
