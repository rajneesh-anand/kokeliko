import React from "react";
import Link from "@/utils/activeLink";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Offcanvas from "react-bootstrap/Offcanvas";
import { signOut, useSession } from "next-auth/client";

const SideMenu = ({ show, handleClose }) => {
  const [session] = useSession();

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      style={{ width: "296px" }}
    >
      <OffcanvasHeader>
        <OffcanvasTitle style={{ width: "100%" }}>
          {!session ? (
            <>
              <div className="text-center">
                <i className="fas fa-user-circle" style={{ fontSize: 64 }}></i>
              </div>

              <div className="text-center">
                <Link href="/auth/signin">
                  <a className="small-btn">Sign In</a>
                </Link>
              </div>
            </>
          ) : (
            <div className="mobile-user-profile-detail">
              <div className="text-center">
                <img
                  className="rounded-circle"
                  src={session.user.image}
                  alt="profile-photo"
                />
              </div>
              <div className="text-center">
                <p>{session.user.name}</p>
              </div>
              <div className="text-center">
                <Link href="/user/account">
                  <a>My Account</a>
                </Link>
              </div>
              <div className="text-center">
                <button className="small-btn" onClick={() => signOut()}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </OffcanvasTitle>
      </OffcanvasHeader>

      <OffcanvasBody>
        <nav>
          <ul className="aside-menu">
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

        <div className="aside-footer-area">
          {/* <ul className="social-links">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <i className="ri-facebook-fill"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank">
                <i className="ri-twitter-fill"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/" target="_blank">
                <i className="ri-linkedin-fill"></i>
              </a>
            </li>
            <li>
              <a href="https://www.messenger.com/" target="_blank">
                <i className="ri-messenger-fill"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank">
                <i className="ri-github-fill"></i>
              </a>
            </li>
          </ul> */}

          <div className="article-share">
            <ul className="social">
              <li>
                <span>Follow Us </span>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="facebook"
                  target="_blank"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  className="twitter"
                  target="_blank"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  className="linkedin"
                  target="_blank"
                >
                  <i className="ri-twitter-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="instagram"
                  target="_blank"
                >
                  <i className="ri-instagram-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideMenu;
