import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import Logo from "@/components/logo";
import SideBarMenu from "@/components/sidebar-menu";
import SideBarCart from "@/components/sidebar-cart";
import MainMenu from "@/components/main-menu";
import { useCart } from "../../contexts/cart/use-cart";
import { GiShoppingBag } from "react-icons/gi";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const Header = ({ classOption }) => {
  const [session, loading] = useSession();
  const { cartItemsCount } = useCart();
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".header-area");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = ({}) => {
    setScroll(window.scrollY);
  };
  return (
    <Fragment>
      <header
        className={`header-area header-default sticky-header ${classOption} ${
          scroll > headerTop ? "sticky" : ""
        }`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="header-content">
              <div className="header-logo">
                <Logo image="/img/logo.png" />
              </div>

              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <MainMenu />
              </div>

              {cartItemsCount > 0 && (
                <div>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      position: "relative",
                    }}
                    onClick={handleShowCart}
                  >
                    <GiShoppingBag
                      style={{
                        height: 28,
                        width: 28,
                        color: "teal",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 18,
                        paddingTop: 8,
                        color: "white",
                        fontSize: 13,
                      }}
                    >
                      {cartItemsCount}
                    </span>
                  </button>
                </div>
              )}

              {session ? (
                <div className="logged-profile">
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    rootClose
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body>
                          <div className="profile-menu">
                            <ul>
                              <li>
                                <Link
                                  href="/user/account"
                                  activeClassName="active"
                                >
                                  <a className="main-menu-link">My Account</a>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/user/course"
                                  activeClassName="active"
                                >
                                  <a className="main-menu-link">My Blogs</a>
                                </Link>
                              </li>
                              <li>
                                <button onClick={() => signOut()}>
                                  Sign Out
                                </button>
                              </li>
                            </ul>
                          </div>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <i className="fas fa-user-circle"></i>
                  </OverlayTrigger>
                </div>
              ) : (
                <div className="logged-profile">
                  <Link href="/auth/signin">
                    <a className="default-btn-sm">Sign In</a>
                  </Link>
                </div>
              )}

              <div className="hamburger-menu">
                <button className="btn-menu" onClick={handleShow}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SideBarMenu show={show} handleClose={handleClose} />
      <SideBarCart show={showCart} handleClose={handleCloseCart} />
    </Fragment>
  );
};

Header.propTypes = {
  classOption: PropTypes.string,
};

Header.defaultProps = {
  classOption: "header-area header-default sticky-header",
};

export default Header;