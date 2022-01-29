import React from "react";
import Link from "@/utils/activeLink";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Offcanvas from "react-bootstrap/Offcanvas";
import { signOut, useSession } from "next-auth/react";

const SideMenu = ({ show, handleClose }) => {
  const { data: session, status } = useSession();

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

        <div className="aside-footer-area">
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
