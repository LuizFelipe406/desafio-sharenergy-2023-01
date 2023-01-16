import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="fixed left-0 h-screen w-fit bg-gradient-to-b from-green to-dgreen shadow-2xl shadow-dgreen flex flex-col items-center font-plexSans font-semibold">
      <h2 className="my-8 mx-5 text-golden">SHARENERGY</h2>
      <div className="w-full flex flex-col items-center h-full border-t border-dgreen">
        <h3 className="mt-16 text-cream">MENU</h3>
        <nav className="flex flex-col items-start justify-around h-1/4 mt-8 text-cream">
          <NavLink
            to="/randomUsers"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 transition duration-200" : undefined
            }
          >
            Random Users
          </NavLink>
          <NavLink
            to="/httpCat"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 transition duration-200" : undefined
            }
          >
            HTTP Cat
          </NavLink>
          <NavLink
            to="/randomDog"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 transition duration-200" : undefined
            }
          >
            Random Dog
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4 transition duration-200" : undefined
            }
          >
            Clients
          </NavLink>
        </nav>
        <div className="text-cream font-bold text-xs flex flex-col items-center mt-96">
          <h3>LUIZ FELIPE PEREIRA</h3>
          <span>Dev FullStack Junior</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar;