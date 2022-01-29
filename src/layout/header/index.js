import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import Logo from "@/components/logo";
import SideBarMenu from "@/components/sidebar-menu";
import SideBarCart from "@/components/sidebar-cart";
import MainMenu from "@/components/main-menu";
import { useCart } from "@/contexts/cart/use-cart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { data: session, status } = useSession();
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
      <header className={`header-area ${scroll > headerTop ? "sticky" : ""}`}>
        <div className="container-fluid">
          <div className="header-content">
            <div className="header-logo">
              <Logo image="/img/logo.png" />
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <MainMenu />
            </div>
            <div className="d-flex align-items-center">
              {cartItemsCount > 0 && (
                <div className="cart-icon">
                  <button onClick={handleShowCart}>
                    <i className="icofont-shopify"></i>
                    <span>{cartItemsCount}</span>
                  </button>
                </div>
              )}

              {session ? (
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
                                href="/user/orders"
                                activeClassName="active"
                              >
                                <a className="main-menu-link">My Orders</a>
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
                  <div className="profile-icon">
                    <FaUserCircle />
                  </div>
                </OverlayTrigger>
              ) : (
                <div className="profile-icon">
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
