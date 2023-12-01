import { menus } from "../constant";
import Carousel from "react-elastic-carousel";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";

const Menu = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
        ease: "linear",
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "linear" },
    },
  };
  const itemsToShow = 5;
  const menuChunks = [];
  for (let i = 0; i < menus.length; i += itemsToShow) {
    menuChunks.push(menus.slice(i, i + itemsToShow));
  }
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <main>
      <p className="monsterat px-7 py-5 font-black text-lg">Menu Favorit</p>
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col sm:flex-row items-center justify-around gap-5"
      >
        <motion.div
          variants={item}
          className="rounded-md h-72 w-64 overflow-y-scroll border-2 shadow-lg border-brand bg-dark "
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="object-cover w-full"
          />
          <span className="flex gap-2 text-white rubik justify-center py-1">
            Scroll{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
          <p className="px-3 py-10 poppins text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            molestiae corrupti dolor id explicabo ipsam et, neque, enim
            assumenda placeat animi iste? Unde suscipit eos ad, consequuntur
            nobis et quisquam.
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="rounded-md h-72 w-64 overflow-y-scroll border-2 shadow-lg border-brand bg-dark "
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="object-cover w-full"
          />
          <span className="flex gap-2 text-white rubik justify-center py-1">
            Scroll{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
          <p className="px-3 py-10 poppins text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            molestiae corrupti dolor id explicabo ipsam et, neque, enim
            assumenda placeat animi iste? Unde suscipit eos ad, consequuntur
            nobis et quisquam.
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="rounded-md h-72 w-64 overflow-y-scroll border-2 shadow-lg border-brand bg-dark "
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="object-cover w-full"
          />
          <span className="flex gap-2 text-white rubik justify-center py-1">
            Scroll{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
          <p className="px-3 py-10 poppins text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            molestiae corrupti dolor id explicabo ipsam et, neque, enim
            assumenda placeat animi iste? Unde suscipit eos ad, consequuntur
            nobis et quisquam.
          </p>
        </motion.div>
      </motion.section>
      <Carousel
        className="cursor-grab focus:cursor-grabbing py-10"
        breakPoints={breakPoints}
        itemsToShow={itemsToShow}
        renderArrow={() => <div></div>}
        renderPagination={() => <div></div>}
      >
        {menuChunks.map((chunk, index) => (
          <div key={index}>
            {chunk.map((menu) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={menu.id}
                className="shadow-md poppins flex items-center cursor-pointer gap-3 rounded-md m-3"
              >
                <img
                  src={menu.image}
                  alt=""
                  className="h-full w-1/2 object-cover rounded-md"
                />
                <div className="flex flex-col">
                  <p>{menu.dish}</p>
                  <p>{menu.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </Carousel>
    </main>
  );
};

export default SectionWrapper(Menu, "menu");
