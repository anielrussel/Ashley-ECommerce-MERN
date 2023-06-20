import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import flowerlogo from "../assets/flowershop.png";
import { RootState } from "../redux";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const cartNumberItem = useSelector(
    (state: RootState) => state.product.cartItem
  );
  const cartNumberUser = cartNumberItem.filter(
    (item) => item.userId === userData._id
  );

  // toggle navbar
  const [showNav, setShowNav] = useState(false);
  const handleNav = () => {
    setShowNav((preve) => !preve);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast.success("Logout successful!");
    navigate("/login");
  };

  const handleShowMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      handleOutsideClick(event);
    };

    if (showMenu) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="font-jost">
      <div className="bg-pink-600 text-white text-center text-sm relative z-30">
        <p>
          Shop now to get <span className="font-bold">10% discount</span>
        </p>
      </div>

      {/* desktop view */}
      <nav className="flex justify-between py-1 lg:px-8 px-2 shadow">
        {/* mobile view */}
        <div className="lg:hidden">
          <div
            className="cursor-pointer z-30 fixed"
            onClick={handleNav}
          >
            {showNav ? (
              <IoMdClose size={35} color={"gray"} />
            ) : (
              <BiMenuAltLeft size={35} color={"gray"} />
            )}
          </div>
          {showNav && (
            <div className="left-0 top-0 z-10 pl-2 w-[150px] h-screen fixed bg-white flex gap-10">
              <ul className="flex flex-col gap-5 lg:gap-8 text-xl font-bold text-gray-600 mt-36">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/menu"}>Flowers</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* mobile view */}

        <div className="hidden lg:block">
          <Link to={"/"}>
            <img
              src={flowerlogo}
              alt="logo"
              className="lg:w-[150px] w-[100px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-3 lg:gap-8">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/menu"}>Flowers</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 items-center lg:gap-8">
          <Link to={"/cart"}>
            {userData.isLoggedIn ? (
              <div className="text-gray-800 relative cursor-pointer">
                <FaShoppingCart size={25} color="gray" />
                <p className="absolute -top-1 -right-1 bg-red-600 p-0 text-sm text-white h-4 w-4 text-center rounded-full">
                  {cartNumberUser.length}
                </p>
              </div>
            ) : (
              <FaShoppingCart size={25} color="gray" />
            )}
          </Link>
          <div
            className="text-gray-800 p-1 border border-gray-700 rounded-full cursor-pointer"
            onClick={handleShowMenu}
          >
            {userData.image ? (
              <img
                src={userData.image}
                alt="user"
                className="lg:w-10 lg:h-10 w-8 h-8 rounded-full shadow-lg"
              />
            ) : (
              <FaUserAlt size={22} color="gray" />
            )}
          </div>
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute flex flex-col bg-white lg:top-[70px] top-[45px] w-auto lg:right-8 right-2 py-4 px-6 shadow-allShadow rounded-md mt-6"
            >
              {userData.email && (
                <div className="p-2 shadow-allShadowLite rounded-md pr-20">
                  <h1 className="font-bold text-lg">{`${userData.firstName} ${userData.lastName}`}</h1>
                  <p>{userData.email}</p>
                </div>
              )}
              {userData.email === import.meta.env.VITE_ADMIN_SERVER && (
                <Link
                  to={"/newproduct"}
                  className="whitespace-nowrap cursor-pointer mt-4 font-bold"
                >
                  New product
                </Link>
              )}
              {userData.email ? (
                <p
                  className="flex items-center gap-2 cursor-pointer mt-20"
                  onClick={handleLogout}
                >
                  <FiLogOut size={30} />
                  Log Out
                </p>
              ) : (
                <Link
                  to={"/login"}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* mobile view */}
    </div>
  );
};

export default Navbar;
