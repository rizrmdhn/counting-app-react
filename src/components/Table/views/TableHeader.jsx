import React from "react";
import alphabetFormat from "../../../utils/alphabetFormat";

function TableHeader({ kegiatan , index }) {
  return (
    <>
      <thead>
        <tr className="bg-yellow">
          <th className="tg-0pky">{alphabetFormat(index)}</th>
          <th className="tg-0lax" colSpan="4">
            {kegiatan.name}
          </th>
        </tr>
      </thead>
    </>
  );
}

export default TableHeader;
