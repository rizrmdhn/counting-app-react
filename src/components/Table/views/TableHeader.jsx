import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteKegiatan } from "../../../redux/dataSlice";
import alphabetFormat from "../../../utils/alphabetFormat";

function TableHeader({ itemId, kegiatan, index, editMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (data, acaraId) => {
    console.log(data, acaraId);
    const editKegiatanData = {
      acaraId: acaraId,
      ...data,
    };
    window.localStorage.setItem(
      "editKegiatanData",
      JSON.stringify(editKegiatanData)
    );
    navigate(`/data/kegiatan/${data.id}/edit`);
  };

  return (
    <>
      <thead>
        <tr className="bg-yellow">
          <th className="tg-0pky">{alphabetFormat(index)}</th>
          <th className="tg-0lax" colSpan="4">
            {kegiatan.name}
          </th>
          {editMode === true ? (
            <th className="tg-editMode animate__animated animate__fadeIn">
              <button
                className="tg-editbtn"
                onClick={() => handleEdit(kegiatan, itemId)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="tg-deleteButton"
                onClick={() =>
                  dispatch(
                    deleteKegiatan({
                      acaraId: itemId,
                      kegiatanId: kegiatan.id,
                    })
                  )
                }
              >
                <i className="bi bi-trash"></i>
              </button>
            </th>
          ) : null}
        </tr>
      </thead>
    </>
  );
}

export default TableHeader;
