import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "./button";

function KeretaCard({
  merk,
  tipe,
  keberangkatan,
  tujuan,
  jml_gerbong,
  onClick,
}
: 
{
  merk: string;
  tipe: string;
  keberangkatan: string;
  tujuan: string;
  jml_gerbong: number;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <>
      <div className="w-full h-fit bg-purple-ternary shadow-lg px-4 py-4 relative rounded-[20px] flex justify-between items-center text-orange-secondary text-2xl">
        <div className="w-fit h-fit flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-white">{merk}</h3>
          <p className="text-xl text-white">{tipe}</p>
        </div>
        <h3 className="text-2xl font-bold text-white">{keberangkatan}</h3>
        <FaArrowRight />
        <h3 className="text-2xl font-bold text-white">{tujuan}</h3>
        <div className="w-fit h-fit flex flex-col justify-center items-center gap-1 text-white">
          <Button
            type="button"
            color="primary"
            text="Pesan Kereta"
            onClick={onClick}
          />
          <p className="text-lg text-white">{jml_gerbong} gerbong</p>
        </div>
      </div>
    </>
  );
}

export default KeretaCard;
