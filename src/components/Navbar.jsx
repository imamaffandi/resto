import React, { useState } from "react";
import { navLinks } from "../constant";
import { Link } from "react-scroll";

const Navbar = () => {
  const [active, setActive] = useState("");

  return (
    <nav className={` w-full flex item-center py-5 fixed top-0 z-50`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="hidden sm:flex text-tertiary text-2xl font-black cursor-pointer ">
            Restaurant
          </p>
        </Link>
        <ul className="list-none flex flex-row gap-5">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-accent" : "text-tertiary"
              } hover:text-secondary text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <Link
                activeClass="active"
                spy={true}
                to={link.id}
                smooth={true}
                duration={500}
              >
                <p>{link.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
