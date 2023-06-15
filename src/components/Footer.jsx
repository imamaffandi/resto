import React from "react";
import {
  foodcorp,
  tiktok,
  whatsapp,
  instagram,
  facebook,
  twitter,
} from "../assets";
import { SectionWrapper } from "../hoc";

const Footer = () => {
  return (
    <section className="h-[50vh] sm:h-screen flex flex-col sm:flex-row  justify-between  sm:items-baseline m-20 sm:m-0 sm:p-20">
      <div className=" flex flex-row items-center p-20 ">
        <img
          src={foodcorp}
          alt="LOGO"
          className="hidden sm:block w-10 h-10 center opacity-75"
        />
        <h1 className="text-lg text-center m-2 font-bold hidden sm:block">
          Restaurant
        </h1>
      </div>
      <div className="p-3 sm:p-32">
        <div className="flex-col items-center justify-around gap-5 m-5">
          {" "}
          <h1 className="text-5xl text-center sm:text-start text-secondary font-black">
            Order Now
          </h1>
          <p className="text-center sm:text-start">000-000-00-000</p>
          <p className="text-center sm:text-start">Jl. Merpati</p>
          <a href="#" className="text-center sm:text-start hover:font-black">
            loremipsum@gmail.com
          </a>
        </div>
        <div className="flex flex-row gap-5 m-3">
          <a href="/">
            <img src={tiktok} alt="" className="" />
          </a>
          <a href="/">
            <img src={twitter} alt="" className="" />
          </a>
          <a href="/">
            <img src={facebook} alt="" className="" />
          </a>
          <a href="/">
            <img src={instagram} alt="" className="" />
          </a>
          <a href="/">
            <img src={whatsapp} alt="" className="" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Footer, "contact");
