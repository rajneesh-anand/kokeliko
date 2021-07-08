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

const SideBarMenu = ({ show, handleClose }) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
  } = useCart();

  const [hasCoupon, setCoupon] = useState(false);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "400px" }}
    >
      <OffcanvasHeader>
        <OffcanvasTitle></OffcanvasTitle>
      </OffcanvasHeader>

      <OffcanvasBody>
        {!!cartItemsCount ? (
          items.map((item) => (
            <CartItem
              key={`cartItem-${item.id}`}
              onIncrement={() => addItem(item)}
              onDecrement={() => removeItem(item)}
              onRemove={() => removeItemFromCart(item)}
              data={item}
            />
          ))
        ) : (
          <p>No Product</p>
        )}

        <div>
          {cartItemsCount !== 0 && (
            <>
              <PromoCode>
                {!coupon?.discountInPercent ? (
                  <>
                    {!hasCoupon ? (
                      <button onClick={() => setCoupon((prev) => !prev)}>
                        Have a special code?
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
                  <a>Place Order {calculatePrice()} </a>
                </div>
              </Link>
            </>
          )}
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideBarMenu;
