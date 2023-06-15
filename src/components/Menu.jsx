import { menus } from "../constant";
import Carousel from "react-elastic-carousel";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";

const Menu = () => {
  const itemsToShow = 5;
  const menuChunks = [];
  for (let i = 0; i < menus.length; i += itemsToShow) {
    menuChunks.push(menus.slice(i, i + itemsToShow));
  }
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div className="relative h-screen py-28 ">
      <h1 className="text-center font-black text-secondary text-5xl my-5">
        Menu
      </h1>
      <Carousel
        breakPoints={breakPoints}
        itemsToShow={itemsToShow}
        renderArrow={({ type, onClick }) => (
          <button onClick={onClick} className={`arrow ${type}`}>
            {type === "PREV" ? "" : ""}
          </button>
        )}
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <div className="flex cursor-pointer">
              {pages.map((page) => (
                <p
                  key={page}
                  onClick={() => onClick(page)}
                  className={`${
                    page === activePage ? "text-black" : "text-gray-500 "
                  } mx-1 font-black`}
                >
                  {page}
                </p>
              ))}
            </div>
          );
        }}
      >
        {menuChunks.map((chunk, index) => (
          <div key={index}>
            {chunk.map((menu) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={menu.id}
                className="shadow-md flex items-center cursor-pointer gap-3 rounded-md m-3"
              >
                <img
                  src={menu.image}
                  alt=""
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div className="flex flex-col text-md">
                  <h3 className="text-start">{menu.dish}</h3>
                  <h4 className="text-center ">{menu.price}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SectionWrapper(Menu, "menu");
