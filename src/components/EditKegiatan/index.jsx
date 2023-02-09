import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editKegiatanFisik, showViewEditData } from "../../redux/dataSlice";
import "./styles/styles.css";

function EditKegiatanFisik() {
  const viewEditData = useSelector(showViewEditData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [kegiatanFisik, setKegiatanFisik] = useState(viewEditData.name);
  const [quantity, setQuantity] = useState(parseInt(viewEditData.quantity));
  const [unit, setUnit] = useState(viewEditData.unit);
  const [alokasiDana, setAlokasiDana] = useState(parseInt(viewEditData.price));

  const handleSubmit = () => {
    const data = {
      id: viewEditData.id,
      kegiatanFisik,
      quantity,
      unit,
      alokasiDana,
      kegiatanId: viewEditData.kegiatanId,
      acaraId: viewEditData.acaraId,
    };
    console.log(data);
    dispatch(editKegiatanFisik(data));
    navigate(-1);
  };

  return (
    <div className="edit-data-kegiatanFisik">
      <form>
        <div className="mb-3">
          <label htmlFor="kegiatanFisik" className="form-label">
            Nama Kegiatan Fisik
          </label>
          <input
            type="text"
            className="form-control"
            id="kegiatanFisik"
            value={kegiatanFisik}
            onChange={(e) => setKegiatanFisik(e.target.value)}
          />
        </div>
        <div className="row g-3 mb-3">
          <div className="col-sm-6">
            <label htmlFor="kegiatanFisik" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="kegiatanFisik" className="form-label">
              Unit
            </label>
            <input
              type="text"
              className="form-control"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="alokasiDana" className="form-label">
            Alokasi Dana
          </label>
          <CurrencyInput
            className="form-control"
            id="alokasiDana"
            name="alokasiDana"
            prefix="Rp. "
            value={alokasiDana}
            decimalsLimit={2}
            onValueChange={(value) => setAlokasiDana(parseInt(value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="kegiatanId" className="form-label">
            Kegiatan Id
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue={viewEditData.kegiatanId}
            aria-label="kegiatanId"
            readOnly
          />
        </div>
      </form>
      <div className="action-button">
        <button
          className="btn btn-danger btn-cancelEdit"
          onClick={() => navigate(-1)}
        >
          Batal
        </button>
        <button
          className="btn btn-primary btn-edit"
          onClick={() => handleSubmit()}
        >
          Edit Kegiatan
        </button>
      </div>
    </div>
  );
}

export default EditKegiatanFisik;
