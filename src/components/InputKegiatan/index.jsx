import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addKegiatan, editKegiatan } from "../../redux/dataSlice";
import "./styles/styles.css";

function InputKegiatan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tahunKegiatan, setTahunKegiatan] = useState("");

  useEffect(() => {
    if (location.pathname !== `/data/add-kegiatan`) {
      const editData = window.localStorage.getItem("editKegiatanData");
      if (editData) {
        const data = JSON.parse(editData);
        setNamaKegiatan(data.name);
        setTahunKegiatan(data.year);
      } else {
        setNamaKegiatan("");
        setTahunKegiatan("");
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === `/data/add-kegiatan`) {
      const acaraId = window.localStorage.getItem("acaraId");
      dispatch(addKegiatan({ namaKegiatan, tahunKegiatan, acaraId }));
      window.localStorage.removeItem("acaraId");
      navigate("/acara");
    } else {
      const editData = window.localStorage.getItem("editKegiatanData");
      const data = JSON.parse(editData);
      dispatch(
        editKegiatan({
          id: data.id,
          namaKegiatan,
          tahunKegiatan,
          acaraId: data.acaraId,
        })
      );
      navigate(`/acara/${data.acaraId}/kegiatan`);
    }
  };

  const handleBack = () => {
    window.localStorage.removeItem("acaraId");
    navigate(-1);
  };

  return (
    <div className="input-data-kegiatan animate__animated animate__fadeIn">
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

export default InputKegiatan;
