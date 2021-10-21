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
                <i className="fas fa-user-circle" style={{ fontSize: 56 }}></i>
                {/* <img
                  src="/images/fav.png"
                  className="rounded-circle"
                  style={{
                    width: "60px",
                    borderRadius: "50%",
                    // marginRight: 5,
                  }}
                /> */}
              </div>

              <div className="text-center">
                <Link href="/auth/signin">
                  <a className="default-btn-sm">Sign In</a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <img
                  src={session.user.image}
                  className="rounded-circle"
                  style={{
                    width: "60px",
                    marginRight: 5,
                  }}
                />
              </div>
              <div className="text-center" style={{ fontSize: 14 }}>
                <p>{session.user.name}</p>
              </div>
              <div className="text-center">
                <Link href="/user/account">
                  <a>My Account</a>
                </Link>
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
            </>
          )}
        </OffcanvasTitle>
      </OffcanvasHeader>

      <OffcanvasBody>
        <nav>
          <ul className="aside-menu">
            <li>
              <Link href="/services" activeClassName="active">
                <a className="main-menu-link">Services</a>
              </Link>
            </li>
            <li>
              <Link href="/membership" activeClassName="active">
                <a className="main-menu-link">Membership Plan</a>
              </Link>
            </li>
            <li>
              <Link href="/products" activeClassName="active">
                <a className="main-menu-link">Products Suggestion</a>
              </Link>
            </li>
            <li>
              <Link href="/courses" activeClassName="active">
                <a className="main-menu-link">Online Seller Courses</a>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link className="sub-menu-link" href="/course/amazon-seller">
                    <a> Amazon Seller Course</a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="sub-menu-link"
                    href="/course/flipkart-seller"
                  >
                    <a> Flipkart Seller Course</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={process.env.PUBLIC_URL + "/telephonic-consultation"}
                activeClassName="active"
              >
                <a className="main-menu-link">Telephonic Consultancy</a>
              </Link>
            </li>
            <li>
              <Link
                href={process.env.PUBLIC_URL + "/blogs"}
                activeClassName="active"
              >
                <a className="main-menu-link">E-Commerce News Updates</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="aside-footer-area text-center ptb-50">
          <ul className="social-links">
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
          </ul>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideMenu;
