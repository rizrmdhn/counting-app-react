import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKegiatanFisik, showDataId } from "../../redux/dataSlice";
import CurrencyInput from "react-currency-input-field";
import "./styles/styles.css";

function Modal() {
  const dataId = useSelector(showDataId);
  const dispatch = useDispatch();

  const [kegiatanFisik, setKegiatanFisik] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [alokasiDana, setAlokasiDana] = useState(0);

  const data = {
    kegiatanFisik,
    quantity,
    unit,
    alokasiDana,
    kegiatanId: dataId.kegiatanId,
    acaraId: dataId.acaraId,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addKegiatanFisik(data));
    // reset form
    setKegiatanFisik("");
    setQuantity(0);
    setUnit("");
    setAlokasiDana(0);

    // close modal
    const backdrop = document.querySelector(".modal-backdrop");
    const modal = document.getElementById("modalInputKegiatanFisik");
    modal.classList.remove("show");
    backdrop.classList.remove("show");
  };

  return (
    <div
      className="modal fade"
      id="modalInputKegiatanFisik"
      tabIndex="-1"
      aria-labelledby="modalInputKegiatanFisikLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Kegiatan Fisik</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
                  defaultValue={dataId.kegiatanId}
                  aria-label="kegiatanId"
                  readOnly
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Tambah Kegiatan Fisik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
