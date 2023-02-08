import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addDataId,
  addKegiatan,
  fetchViewData,
} from "../../../redux/dataSlice";
import alphabetFormat from "../../../utils/alphabetFormat";
import currencyFormat from "../../../utils/currencyFormat";
import NoDataTablePage from "../../Error/NoDataTablePage";
import "./styles/styles.css";

function Table({ viewData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (viewData.length === 0) {
  //     navigate("/acara");
  //   }
  // }, []);

  const handleAddKegiatan = () => {
    const acaraId = viewData[0].id;
    window.localStorage.setItem("acaraId", acaraId);
    navigate("/data/add-kegiatan");
  };

  return (
    <div className="table-container">
      <div className="tg-wrap">
        <NoDataTablePage addKegiatan={() => handleAddKegiatan()} />
        <>
          {viewData.map((item) => (
            <>
              <table className="tg" key={item.id}>
                {item.kegiatan.map((kegiatan, index) => (
                  <>
                    <thead key={kegiatan.id}>
                      <tr className="bg-yellow">
                        <th className="tg-0pky">{alphabetFormat(index)}</th>
                        <th className="tg-0lax" colSpan="4">
                          {kegiatan.name}
                        </th>
                      </tr>
                    </thead>
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
                        <tr key={kegiatanFisik.id}>
                          <td className="tg-0pky">{index + 1}</td>
                          <td className="tg-kegiatanFisikName">
                            {kegiatanFisik.name}
                          </td>
                          <td className="tg-quantity">
                            {kegiatanFisik.quantity}
                          </td>
                          <td className="tg-unit">{kegiatanFisik.unit}</td>
                          <td className="tg-alokasiDana">
                            {currencyFormat(kegiatanFisik.price)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="tg-addKegiatan" colSpan="5">
                          <button
                            type="button"
                            className="btn-addKegiatanFisik"
                            // onclick get item.id and kegiatan.id
                            onClick={() => {
                              dispatch(
                                addDataId({
                                  acaraId: item.id,
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
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax" colSpan="3">
                          JUMLAH
                        </td>
                        <td className="tg-totalPrice">
                          {currencyFormat(kegiatan.totalPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </>
          ))}
        </>
      </div>
      <button className="btn btn-primary" onClick={() => console.log(viewData)}>
        test
      </button>
    </div>
  );
}

export default Table;
