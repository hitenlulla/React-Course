import React from "react";

// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
export default function MainNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            {/* Simple link */}
            {/* <Link to="/">Home</Link> */}

            {/* Special link to tell if the current route is active */}
            <NavLink
              to="/"
              end={true}
              className={(link) => (link.isActive ? classes.active : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={(link) => (link.isActive ? classes.active : undefined)}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
