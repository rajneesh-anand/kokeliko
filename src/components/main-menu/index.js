import React from "react";
import Link from "@/utils/activeLink";

const MainMenu = () => {
  return (
    <nav>
      <ul className="main-menu">
        <li>
          <Link href="/spirituality" activeClassName="active">
            <a className="main-menu-link">Spirituality</a>
          </Link>
        </li>
        <li>
          <Link href="/meditation" activeClassName="active">
            <a className="main-menu-link">Meditation</a>
          </Link>
        </li>
        <li>
          <Link href="/yoga" activeClassName="active">
            <a className="main-menu-link">Yoga</a>
          </Link>
        </li>
        <li>
          <Link href="/shop" activeClassName="active">
            <a className="main-menu-link">Shop</a>
          </Link>
        </li>
        <li>
          <Link href="/query" activeClassName="active">
            <a className="main-menu-link">Send Us Query ?</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
