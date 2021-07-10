import React, { useState } from "react";
import Link from "next/link";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CartItem } from "./CartItem";
import { useCart } from "../../contexts/cart/use-cart";
import Coupon from "../coupon";
import { PromoCode, CouponBoxWrapper, CouponCode } from "./Cart-Style";
import { MdRemoveShoppingCart } from "react-icons/md";
import { CURRENCY } from "../../constant/currency";

const SideBarCart = ({ show, handleClose }) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
    getItem,
  } = useCart();

  const [hasCoupon, setCoupon] = useState(false);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="cart-sidebar"
    >
      <OffcanvasHeader className="cart-header">
        <OffcanvasTitle>Shopping Cart</OffcanvasTitle>
        <button
          className="btn btn-sm btn-primary"
          type="button"
          onClick={handleClose}
        />
      </OffcanvasHeader>

      <OffcanvasBody>
        {!!cartItemsCount ? (
          items.map((item) => (
            <div key={item.id}>
              <CartItem
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <MdRemoveShoppingCart
              style={{ height: 64, width: 64, color: "grey" }}
            />
            <p>Your cart is empty , Please Add products in your cart.</p>
            <Link href="/shop">
              <a className="blue-button">Add Product</a>
            </Link>
          </div>
        )}

        <div>
          {cartItemsCount !== 0 && (
            <>
              <PromoCode>
                {!coupon?.discountInPercent ? (
                  <>
                    {!hasCoupon ? (
                      <button onClick={() => setCoupon((prev) => !prev)}>
                        Apply coupon code ?
                      </button>
                    ) : (
                      <CouponBoxWrapper>
                        <Coupon
                          disabled={!items.length}
                          style={{
                            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06)",
                          }}
                        />
                      </CouponBoxWrapper>
                    )}
                  </>
                ) : (
                  <CouponCode>
                    <p>Coupon Applied</p>
                    <span>{coupon.code}</span>
                  </CouponCode>
                )}
              </PromoCode>

              <Link href="/checkout">
                <div className="checkout-footer">
                  <a>
                    Place Order {CURRENCY.INR}
                    {calculatePrice()}
                  </a>
                </div>
              </Link>
            </>
          )}
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideBarCart;
