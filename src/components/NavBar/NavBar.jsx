import { useState } from "react";
import NavMenu from "./NavMenu";
import MenuToggle from "./MenuToggle";
import CartWidget from "./CartWidget";
import LinkRouter from "../LinkRouter";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleCart = () => {
    setOpenCart(!openCart);
  }

  return (
    <header className="fixed z-[100] top-0 left-0 bg-white w-full shadow-md">
      <nav className="max-w-[1540px] relative mx-auto px-6 flex justify-between items-center w-full h-16 transition-all">
        <LinkRouter to={"/"}><h2 className="font-playfart text-lg md:text-3xl w-40 md:w-max cursor-pointer">Marcos Commerce</h2></LinkRouter>
        <div className="flex items-center gap-2 md:gap-8">
          <CartWidget open={openCart} toggle={toggleCart} />
          <div className="w-0.5 h-10 bg-black" />
          <MenuToggle imagen={"/menu-line.svg"} button={toggleMenu} />
        </div>
      </nav>
      <NavMenu openMenu={openMenu} open={openCart} toggle={toggleCart} toggleMenu={toggleMenu} />

    </header>
  );
};

export default Navbar;
