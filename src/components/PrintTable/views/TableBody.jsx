import React from "react";
import currencyFormat from "../../../utils/currencyFormat";

function TableBody({ kegiatan }) {
  return (
    <>
      <tbody>
        <tr>
          <td className="tg-0pky tg-align-center">NO</td>
          <td className="tg-0pky">KEGIATAN FISIK</td>
          <td className="tg-0pky tg-align-center tg-width-100" colSpan="2">
            VOLUME
          </td>
          <td className="tg-0pky tg-align-center">ALOKASI DANA</td>
        </tr>
        {kegiatan.kegiatanFisik.map((kegiatanFisik, index) => (
          <tr key={kegiatanFisik.id}>
            <td className="tg-0pky">{index + 1}</td>
            <td className="tg-0pky">{kegiatanFisik.name}</td>
            <td className="tg-0pky tg-align-center">{kegiatanFisik.quantity}</td>
            <td className="tg-0pky tg-align-center">{kegiatanFisik.unit}</td>
            <td className="tg-0pky tg-align-right">
              {currencyFormat(kegiatanFisik.price)}
            </td>
          </tr>
        ))}
        <tr>
          <td className="tg-0pky"></td>
          <td className="tg-0pky" colSpan="3">
            JUMLAH
          </td>
          <td className="tg-0pky tg-align-right">
            {currencyFormat(kegiatan.totalPrice)}
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default TableBody;
