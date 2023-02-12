import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ item, onAddKegiatanFisik, editMode }) {
  return (
    <>
      {item.kegiatan.map((kegiatan, index) => {
        return (
          <TableHeader
            kegiatan={kegiatan}
            index={index}
            editMode={editMode}
            itemId={item.id}
            key={kegiatan.id}
            onAddKegiatanFisik={onAddKegiatanFisik}
          />
        );
      })}
    </>
  );
}

export default Table;
