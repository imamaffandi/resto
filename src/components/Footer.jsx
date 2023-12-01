import React from "react";
import { tiktok, whatsapp, instagram, facebook, twitter } from "../assets";
import { SectionWrapper } from "../hoc";

const Footer = () => {
  return (
    <section className=" sm:h-screen flex flex-col-reverse sm:flex-row justify-evenly text-darkest sm:items-baseline sm:m-0 sm:p-20 pb-20">
      <div className=" flex flex-col gap-10 items-start sm:items-center p-2 ">
        <div className="flex">
          <h1 className="text-lg m-2 font-bold hidden sm:block young tracking-wider">
            Restaurants
          </h1>
        </div>
        <div>
          <div className=" flex items-center gap-3 pt-3 monsterat cursor-pointer">
            <p>Malang, Indonesia</p>
          </div>

          <div className="flex flex-row gap-5 mt-3">
            <a href="#">
              <img src={tiktok} />
            </a>
            <a href="#">
              <img src={twitter} />
            </a>

            <a href="#">
              <img src={facebook} />
            </a>
            <a href="#">
              <img src={instagram} />
            </a>
            <a href="#">
              <img src={whatsapp} />
            </a>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-32">
        <div className="flex-col items-center justify-around gap-5 m-5">
          {" "}
          <h1 className="text-5xl text-dark font-black young tracking-wider">
            Reserve Now
          </h1>
        </div>
        <div className="xl:mt-12 px-15 overflow:hidden sm:object-scale-down">
          <div className="flex-[0.75] border-2 border-mid bg-darkest p-8 rounded-2xl">
            <form className="mt-12 flex flex-col gap-8">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2 neue tracking-wider">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Whats your name?"
                  className="border-2 border-brand glass py-2 px-6 text-white rounded-lg poppins outlined-none font-light"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2 neue tracking-wider">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="border-2 border-brand glass py-2 px-6 text-white rounded-lg poppins outlined-none font-light"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2 neue tracking-wider">
                  Message
                </span>
                <textarea
                  name="message"
                  placeholder="What do you want to say?"
                  className="border-2 border-brand glass py-2 px-6 text-white rounded-lg poppins outlined-none font-light"
                />
              </label>
              <button
                type="submit"
                className="hover:bg-dark border-2 border-brand py-3 px-8 outline-none w-fit text-white font-bold shadow-md  rounded-xl z-20 neue tracking-widest"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Footer, "contact");
