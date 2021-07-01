import React from "react";
import Link from "next/link";
import { getClosest, getSiblings, slideToggle, slideUp } from "../../utils";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Offcanvas from "react-bootstrap/Offcanvas";

const SideBarMenu = ({ show, handleClose }) => {
  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    if (
      parentEl?.classList.contains("menu-toggle") ||
      target.classList.contains("menu-toggle")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      style={{ width: "250px" }}
    >
      <OffcanvasHeader closeButton style={{ backgroundColor: "#e4ded6" }}>
        <OffcanvasTitle></OffcanvasTitle>
      </OffcanvasHeader>

      <OffcanvasBody style={{ backgroundColor: "#100f0f" }}>
        <div className="asside-navigation-area">
          <ul className="asside-menu">
            <li className="item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {/* <li className="dropdown-submenu">
              <Link href="/portfolio">
                <span>
                  <a>Portfolio</a>
                </span>
              </Link>
              <span
                className="menu-toggle"
                onClick={onClickHandler}
                aria-hidden="true"
              ></span>
              <ul className="dropdown-nav">
                <li>
                  <Link href="/portfolio">
                    <a>Portfolio</a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio-details/1">
                    <a>Portfolio Details</a>
                  </Link>
                </li>
              </ul>
            </li>
           */}
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/blogs">
                <a>Blogs</a>
              </Link>
            </li>
            <li>
              <Link href="/movie">
                <a>Movie</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="off-canvas-footer"></div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideBarMenu;
