import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MenuSvg from "../assets/svg/MenuSvg";
import { navigation } from "../constants";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUserContext();
  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = useNavigate();

  const toggleNavigation = () => {
    setOpenNavigation((prevOpen) => !prevOpen);
  };

  const handleClick = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    }
  };

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block xl:mr-8" href="/">
          <p>By Ahmad!</p>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-primaryHover px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname ? "text-color-primary" : "text-n-1/50"
                } lg:leading-5 xl:px-12`}
                onClick={handleClick}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        {user.token == undefined ? (
        <a
            href="/login"
            className="py-2 px-5 bg-color-primary text-white rounded-md shadow-md hover:bg-color-primaryHover focus:outline-none focus:ring-2  focus:ring-opacity-50 ml-auto lg:m-0"
          >
            <button>Login</button>
          </a>
        ) : (
          <button
            onClick={logoutUser}
            className="py-2 px-5 bg-color-primary text-white rounded-md shadow-md hover:bg-color-primaryHover focus:outline-none focus:ring-2  focus:ring-opacity-50 ml-auto lg:m-0"
          >
            Sign Out
          </button>
        )}

        <div className="lg:hidden ml-4" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </div>
      </div>
    </div>
  );
};

export default Header;
