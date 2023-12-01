import React from "react";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
const Event = () => {
  const right = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { ease: "linear" },
    },
  };
  return (
    <motion.main
      variants={right}
      initial="hidden"
      whileInView="visible"
      className="bg-lightest flex items-center justify-center p-10 mt-20 "
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center rounded-md bg-darkest text-white poppins h-full w-[95%] sm:w-[80%]">
        <p className="px-5 py-3 max-w-md">
          <span className="text-sm monsterat block">
            30 December 2023 || 15:00-20:00
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          assumenda quae cumque. Ipsam accusamus ratione veritatis rerum magni
          quis numquam?
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1661405561361-cf3d8550ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFjY291c3RpYyUyMGd1aXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          className="w-full md:w-1/2 object-cover "
        />
      </div>
    </motion.main>
  );
};

export default SectionWrapper(Event, "event");
