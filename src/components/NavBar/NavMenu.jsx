import { useEffect, useState } from "react";
import { menuItems } from "../../../data";
import LinksAnimation from "../LinksAnimation";
import MenuToggle from "./MenuToggle";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const NavMenu = ({ open, openMenu ,toggleMenu , toggle, }) => {
  const openCart = open;
  const toggleCart = toggle;

  const [showContainer, setShowContainer] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (openMenu) {
      setShowContainer(true);
      setTimeout(() => {
        setShowLinks(true);
      }, 300);
    } else {
      setShowLinks(false);
      setTimeout(() => {
        setShowContainer(false);
      }, 1000);
    }
  }, [openMenu]);

  const handleClose = () => {
    setShowLinks(false);
    setTimeout(() => {
      toggleMenu();
    }, 200);
  };

  return (
    <div
      className={`fixed z-50 ${
        showContainer ? "top-0" : "top-[-150%]"
      } left-0 h-screen w-full bg-slate-50 transition-all duration-[900ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)]`}
    >
      <nav className="w-full shadow-md">
      <div className="max-w-[1540px] mx-auto px-6 flex justify-between items-center h-16">
        <Link to={"/"} ><h2 className="font-playfart text-xl md:text-3xl">Marcos Commerce</h2> </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <CartWidget open={openCart} toggle={toggleCart} />

          <div className="w-0.5 h-10 bg-black" />
          <MenuToggle imagen={"/close-large-line.svg"} button={handleClose} />
        </div>
        </div>
      </nav>
      <ul className="max-w-[1540px] mx-auto px-6 p-8 flex flex-col gap-7">
        {menuItems.map((item, index) => (
          <LinksAnimation
            link={item.link}
            key={index}
            open={showLinks}
            text={item.text} 
            delay={index * 150}
            onClick={handleClose}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;

