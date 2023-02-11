import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ item, onAddKegiatanFisik, editMode }) {
  return (
    <>
      {item.kegiatan.map((kegiatan, index) => {
        return (
          <>
            <TableHeader
              kegiatan={kegiatan}
              index={index}
              editMode={editMode}
              itemId={item.id}
              key={kegiatan.id}
            />
            <TableBody
              kegiatan={kegiatan}
              index={index}
              onAddKegiatanFisik={onAddKegiatanFisik}
              itemId={item.id}
              key={index}
            />
          </>
        );
      })}
    </>
  );
}

export default Table;
