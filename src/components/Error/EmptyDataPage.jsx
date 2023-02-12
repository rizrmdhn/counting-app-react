import React from "react";
import "./styles/style.css";

function EmptyDataPage(props) {
  return (
    <>
      <thead className="emptyData-container">
        <tr>
          <th className="emptyData-title">Data Kosong</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="emptyData-subtitle">
            Silahkan tambahkan data kegiatan terlebih dahulu
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default EmptyDataPage;
