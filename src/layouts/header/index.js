import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import Logo from "../../components/logo";
import Profile from "../../components/profile";
import SideBarMenu from "../../components/sidebar-menu";
import SideBarCart from "../../components/sidebar-cart";
import ActiveLink from "../../utils/activeLink";
import { useCart } from "../../contexts/cart/use-cart";
import { GiShoppingBag } from "react-icons/gi";

const Header = ({ classOption }) => {
  const { cartItemsCount } = useCart();
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const [ofcanvasShow, setOffcanvasShow] = useState(false);
  const onCanvasHandler = () => {
    setOffcanvasShow((prev) => !prev);
  };
  const [searchbarShow, setSearchbarShow] = useState(false);
  const onSearchHandler = () => {
    setSearchbarShow((prev) => !prev);
  };
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
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="header-action-area">
                <button className="btn-menu" onClick={handleShow}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <span className="menu-text">Menu</span>
              </div>
            </div>

            <div className="col-auto">
              <div className="header-logo-area">
                <Logo image={`${process.env.PUBLIC_URL}/img/logo.png`} />
              </div>
            </div>
            <div className="col">
              <div className="topNav">
                <div>
                  <ActiveLink
                    href="/articles/spirituality"
                    activeClassName="active-link"
                  >
                    <a>Spirituality</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink
                    href="/articles/meditation"
                    activeClassName="active-link"
                  >
                    <a>Meditation</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink
                    href="/articles/yoga"
                    activeClassName="active-link"
                  >
                    <a>Yoga</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink
                    href="/articles/ayurveda"
                    activeClassName="active-link"
                  >
                    <a>Ayurveda</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink
                    href="/articles/travel"
                    activeClassName="active-link"
                  >
                    <a>Travel</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink
                    href="/articles/tantra"
                    activeClassName="active-link"
                  >
                    <a>Tantra</a>
                  </ActiveLink>
                </div>
                <div>
                  <ActiveLink href="/shop" activeClassName="active-link">
                    <a>Shop</a>
                  </ActiveLink>
                </div>
                {/* <div>
                  <ActiveLink href="/query" activeClassName="active-link">
                    <a>Send Your Queries ?</a>
                  </ActiveLink>
                </div> */}
              </div>
            </div>
            <div className="col-auto">
              {cartItemsCount > 0 && (
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
              )}
            </div>
            <div className="col-auto header-profile">
              <Profile />
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
