import React from "react";
import { foodcorp } from "../assets";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div className=" flex flex-col items-center justify-center gradient h-screen m-0 p-0">
      <img
        src={foodcorp}
        alt=""
        className=" object-center h-96 w-96 object-contain"
      />
      <Link to="menu" smooth={true}>
        <button className="p-10 py-1 btn-grad white rounded-full shadow-lg font-mono font-bold hover:bg-orange-600">
          GO
        </button>
      </Link>
    </div>
  );
};

export default Home;
