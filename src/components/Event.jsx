import React from "react";
import { slide } from "../constant";
import Carousel from "react-elastic-carousel";
import { SectionWrapper } from "../hoc";

const Event = () => {
  return (
    <div className="">
      <svg
        className="w-0 h-0 absolute"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#f7c7c7" />
          <stop offset="100%" stopColor="#e6e857" />
        </linearGradient>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          className="wave"
          fill="url(#gradient)"
          fillOpacity="1"
          d="M0,128L120,112C240,96,480,64,720,58.7C960,53,1200,75,1320,85.3L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
      <h1 className="font-black text-secondary  text-2xl text-center">
        EVENTS
      </h1>

      <div className="w-full ">
        <Carousel
          enableAutoPlay
          autoPlaySpeed={5000}
          itemPadding={[10, 20]}
          easing="cubic-bezier(.51,.3,.69,.88)"
          transitionMs={500}
          renderPagination={() => <div className="pagination"></div>}
          renderArrow={({ type, onClick }) => (
            <button onClick={onClick} className={`arrow ${type}`}>
              {type === "PREV" ? "" : ""}
            </button>
          )}
        >
          {slide.map((slider) => {
            return (
              <div key={slider.id}>
                <img
                  src={slider.img}
                  alt=""
                  className="h-[30vh] sm:h-screen w-full sm:w-screen object-cover rounded-xl"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default SectionWrapper(Event, "event");
