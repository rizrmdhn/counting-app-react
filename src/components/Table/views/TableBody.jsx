import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addDataId,
  deleteKegiatanFisik,
  getViewEditData,
} from "../../../redux/dataSlice";
import currencyFormat from "../../../utils/currencyFormat";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function TableBody({ kegiatan, itemId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const editDataButton = (data) => {
    if (data.length > 0) {
      setEditMode(!editMode);
    } else {
      MySwal.fire({
        title: "Data Kosong",
        text: "Silahkan tambahkan data terlebih dahulu",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
  };

  const handleEdit = (data, itemId) => {
    const datas = {
      ...data,
      acaraId: itemId,
    };
    dispatch(getViewEditData(datas));
    navigate(`/data/edit/${data.kegiatanFisikId}`);
  };
  return (
    <>
      <tbody>
        <tr className="bg-yellow">
          <td className="tg-0pky">NO</td>
          <td className="tg-kegiatanFisik">KEGIATAN FISIK</td>
          <td className="tg-volume" colSpan="2">
            VOLUME
          </td>
          <td className="tg-header">ALOKASI DANA</td>
        </tr>
        {kegiatan.kegiatanFisik.map((kegiatanFisik, index) => (
          <tr key={index}>
            <td className="tg-0pky">{index + 1}</td>
            <td className="tg-kegiatanFisikName">{kegiatanFisik.name}</td>
            <td className="tg-quantity">{kegiatanFisik.quantity}</td>
            <td className="tg-unit">{kegiatanFisik.unit}</td>
            <td className="tg-alokasiDana">
              {currencyFormat(kegiatanFisik.price)}
            </td>
            {editMode === true ? (
              <div className="animate__animated animate__fadeIn">
                <td className="tg-editMode ">
                  <button
                    className="tg-editbtn"
                    onClick={() => handleEdit(kegiatanFisik, itemId)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="tg-deleteButton"
                    onClick={() =>
                      dispatch(
                        deleteKegiatanFisik({
                          acaraId: itemId,
                          kegiatanFisikId: kegiatanFisik.id,
                        })
                      )
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </div>
            ) : null}
          </tr>
        ))}
        <tr>
          <td className="tg-actionButton" colSpan="5">
            <button
              type="button"
              className="btn-editKegiatanFisik"
              onClick={() => editDataButton(kegiatan.kegiatanFisik)}
            >
              Edit Kegiatan Fisik
            </button>
            <button
              type="button"
              className="btn-addKegiatanFisik"
              onClick={() => {
                dispatch(
                  addDataId({
                    acaraId: itemId,
                    kegiatanId: kegiatan.id,
                  })
                );
              }}
              data-bs-toggle="modal"
              data-bs-target="#modalInputKegiatanFisik"
            >
              Tambah Kegiatan Fisik
            </button>
          </td>
        </tr>
        <tr className="bg-green">
          <td className=""></td>
          <td className="tg-0lax" colSpan="3">
            JUMLAH
          </td>
          <td className="tg-totalPrice">
            {currencyFormat(kegiatan.totalPrice)}
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default TableBody;
