import React from "react";
import Link from "next/link";
import { getClosest, getSiblings, slideToggle, slideUp } from "../../utils";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Offcanvas from "react-bootstrap/Offcanvas";
import { signOut, useSession } from "next-auth/client";

const SideBarMenu = ({ show, handleClose }) => {
  const [session] = useSession();
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
      style={{ width: "260px" }}
    >
      <OffcanvasHeader>
        <OffcanvasTitle style={{ width: "100%", fontFamily: "Poppins" }}>
          {!session ? (
            <>
              <div className="text-center">
                <img
                  src="/fav.png"
                  style={{
                    width: "60px",
                    borderRadius: "50%",
                    marginRight: 5,
                  }}
                />
              </div>

              <div className="profile-sidebar-slider">
                <Link href="/auth/signin">
                  <a>Sign In</a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <img
                  src={session.user.image}
                  style={{
                    width: "60px",
                    borderRadius: "50%",
                    marginRight: 5,
                  }}
                />
              </div>
              <div className="text-center" style={{ fontSize: 14 }}>
                <p>{session.user.name}</p>
              </div>
              <div className="profile-sidebar-slider">
                <Link href="/user/account">
                  <a>My Account</a>
                </Link>
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
            </>
          )}
        </OffcanvasTitle>
      </OffcanvasHeader>

      <OffcanvasBody style={{ backgroundColor: "#100f0f" }}>
        <div className="asside-navigation-area">
          <ul className="asside-menu">
            <li className="item">
              <Link href="/articles/spirituality">
                <a>Spirituality</a>
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
              <Link href="/articles/Meditation">
                <a>Meditation</a>
              </Link>
            </li>
            <li>
              <Link href="/articles/yoga">
                <a>Yoga</a>
              </Link>
            </li>
            <li>
              <Link href="/articles/ayurveda">
                <a>Ayurveda</a>
              </Link>
            </li>
            <li>
              <Link href="/articles/travel">
                <a>Travel</a>
              </Link>
            </li>
            <li>
              <Link href="/articles/tantra">
                <a>Tantra</a>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </li>
            <li>
              <Link href="/query">
                <a>Send Your Queries ?</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </li>
          </ul>
        </div>
      </OffcanvasBody>

      <div className="side-footer">
        <ul className="widget-social-icons">
          <li className="social-text">
            <span>Follow us on social</span>
          </li>
          <li>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="social_twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="social_facebook"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="social_instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </Offcanvas>
  );
};

export default SideBarMenu;
