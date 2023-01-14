import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <h2>Sharenergy</h2>
      <h3>Menu</h3>
      <NavLink
        to="randomUsers"
      >
        Random Users
      </NavLink>
      <NavLink
        to="httpCat"
      >
        HTTP Cat
      </NavLink>
      <NavLink
        to="randomDog"
      >
        Random Dog
      </NavLink>
      <NavLink
        to="clients"
      >
        Clients
      </NavLink>
    </div>
  )
}

export default SideBar;