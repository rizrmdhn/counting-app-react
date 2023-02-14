import React from "react";
import currencyFormat from "../../../utils/currencyFormat";
import TableHeader from "./TableHeader";

function Table({ item }) {
  return (
    <>
      {item.kegiatan.map((kegiatan, index) => (
        <TableHeader key={kegiatan.id} kegiatan={kegiatan} index={index} />
      ))}
      <tfoot>
        <tr>
          <td className="tg-0lax" colSpan="4">
            {" "}
            <em>TOTAL DANA KESELURUHAN</em>
          </td>
          <td className="tg-0lax">{currencyFormat(item.totalPrice)}</td>
        </tr>
      </tfoot>
    </>
  );
}

export default Table;
