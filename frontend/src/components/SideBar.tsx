import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="fixed top-0 lg:left-0 h-fit lg:h-screen w-screen lg:w-fit bg-gradient-to-b from-green to-dgreen shadow-md lg:shadow-2xl shadow-dgreen
      flex lg:flex-col items-center font-plexSans font-semibold
      justify-between"
    >
      <h2 className="mx-4 md:mx-5 md:my-8 text-golden">SHARENERGY</h2>
      <div className="flex lg:flex-col items-center justify-start sm:justify-between w-full lg:w-fit h-fit lg:h-full lg:border-t lg:border-dgreen">
        <h3 className="lg:mt-16 text-cream hidden lg:visible">MENU</h3>
        <nav className="flex lg:flex-col lg:items-start lg:justify-around h-1/4 lg:mt-8 text-cream">
          <NavLink
            to="/randomUsers"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 transition duration-200 md:mr-3 mr-2"
                : "mr-2 md:mr-3"
            }
          >
            Random Users
          </NavLink>
          <NavLink
            to="/httpCat"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 transition duration-200 md:mr-3 mr-2"
                : "mr-2 md:mr-3"
            }
          >
            HTTP Cat
          </NavLink>
          <NavLink
            to="/randomDog"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 transition duration-200 md:mr-3 mr-2"
                : "mr-2 md:mr-3"
            }
          >
            Random Dog
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 transition duration-200"
                : undefined
            }
          >
            Clients
          </NavLink>
        </nav>
        <div className="text-cream font-bold text-xs flex flex-col items-center lg:mt-96 mr-4 invisible sm:visible">
          <h3>LUIZ FELIPE PEREIRA</h3>
          <span>Dev FullStack Junior</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
