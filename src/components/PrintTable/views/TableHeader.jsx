import React from "react";
import alphabetFormat from "../../../utils/alphabetFormat";
import TableBody from "./TableBody";

function TableHeader({ index, kegiatan }) {
  return (
    <>
      <thead>
        <tr>
          <th className="tg-9wq8">{alphabetFormat(index)}</th>
          <th className="tg-lboi" colSpan="4">
            {kegiatan.name}
          </th>
        </tr>
      </thead>
      <TableBody kegiatan={kegiatan} index={index} />
    </>
  );
}

export default TableHeader;
