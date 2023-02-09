import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ item, onAddKegiatanFisik }) {
  return (
    <table className="tg animate__animated animate__fadeIn" key={item.id}>
      {item.kegiatan.map((kegiatan, index) => (
        <>
          <TableHeader kegiatan={kegiatan} key={kegiatan.id} index={index} />
          <TableBody
            kegiatan={kegiatan}
            key={index}
            index={index}
            onAddKegiatanFisik={onAddKegiatanFisik}
            itemId={item.id}
          />
        </>
      ))}
    </table>
  );
}

export default Table;
