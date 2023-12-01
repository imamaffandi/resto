import React, { useState } from "react";
import { navLinks } from "../constant";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("");
  const down = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      transition: { ease: "linear" },
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.nav
      variants={down}
      initial="hidden"
      whileInView="visible"
      className="bg-mid w-full flex justify-between items-center fixed p-5 top-0 z-50"
    >
      <motion.div
        className="flex items-center gap-2"
        onClick={(e) => {
          window.scrollTo(0, 0);
        }}
      >
        <p className=" young text-white text-xl sm:text-2xl font-black cursor-pointer ">
          Restaurant
        </p>
      </motion.div>
      <ul className="list-none flex flex-row gap-2 sm:gap-5">
        {navLinks.map((link) => (
          <li key={link.id} onClick={() => setActive(link.title)}>
            <Link to={link.id} smooth={true}>
              <p
                className={`${
                  active === link.title ? "text-white" : "text-slate-200"
                } hover:text-brand young font-medium cursor-pointer`}
              >
                {link.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
