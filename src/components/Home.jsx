import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
const Home = () => {
  const up = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      transition: { ease: "linear" },
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="bg-dark h-screen flex items-center w-full">
      <motion.div
        variants={up}
        initial="hidden"
        whileInView="visible"
        className="flex-col items-center gap-10 px-10 z-10"
      >
        <p className="text-3xl max-w-md text-brand young py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          dolore!
        </p>
        <Link to="contact" smooth={true}>
          <button className="border-2  border-white p-10 py-1 rounded-sm shadow-lg text-white monsterat font-black hover:text-dark hover:bg-lightest">
            RESERVE NOW
          </button>
        </Link>
      </motion.div>
      <img
        src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        className="object-cover w-full h-full absolute brightness-50 z-0 opacity-70"
      />
    </div>
  );
};

export default SectionWrapper(Home, "home");
