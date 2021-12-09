import React from "react";
import Link from "@/utils/activeLink";

const MainMenu = () => {
  return (
    <nav>
      <ul className="main-menu">
        <li>
          <Link href="/politics" activeClassName="active">
            <a className="main-menu-link">Politics</a>
          </Link>
        </li>
        <li>
          <Link href="/sports" activeClassName="active">
            <a className="main-menu-link">Sports</a>
          </Link>
        </li>
        <li>
          <Link href="/health" activeClassName="active">
            <a className="main-menu-link">Health</a>
          </Link>
        </li>
        <li>
          <Link href="/technology" activeClassName="active">
            <a className="main-menu-link">Technology</a>
          </Link>
        </li>
        <li>
          <Link href="/entertainment" activeClassName="active">
            <a className="main-menu-link">Entertainment</a>
          </Link>
        </li>
        <li>
          <Link href="/jobs" activeClassName="active">
            <a className="main-menu-link">Jobs &amp; Career</a>
          </Link>
        </li>
        <li>
          <Link href="/travel" activeClassName="active">
            <a className="main-menu-link">Travel</a>
          </Link>
        </li>
        <li>
          <Link href="/fashion-beauty" activeClassName="active">
            <a className="main-menu-link">Fashion &amp; Beauty</a>
          </Link>
        </li>
        <li>
          <Link href="/yoga-meditation" activeClassName="active">
            <a className="main-menu-link">Yoga &amp; Meditation</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
