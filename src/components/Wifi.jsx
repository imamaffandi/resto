import React from "react";
import { qr } from "../assets";

function Wifi() {
  return (
    <div className=" flex items-center justify-center pt-48 ">
      <div className=" flex flex-col  items-center justify-center m-0 p-5 shadow-xl bg-secondary glass text-secondary  rounded-2xl">
        <h1 className="font-black text-2xl">WIFI PASSWORD</h1>
        <img
          src={qr}
          alt=""
          className="object-center h-64 w-64 m-5 object-contain"
        />
        <div className="flex justify-between gap-10 items-center">
          <p className="font-bold text-md">Username: thisWifi</p>
          <p className="font-bold text-md">Password: thisPass</p>
        </div>
      </div>
    </div>
  );
}

export default Wifi;
