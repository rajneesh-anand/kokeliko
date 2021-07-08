import styled from "styled-components";

const CartPopupBody = styled.div`
  height: auto;
  width: 385px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: #ffffff;
  box-sizing: content-box;

  @media (max-width: 767px) {
    width: 100%;
  }

  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const CheckoutButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;
const ItemImgWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemDetails = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const ItemTitle = styled.span`
  font-family: "Lato;
  font-size: 15px;
  font-weight: 700;
  color: #0D1136;
  margin-bottom: 10px;
`;

const ItemPrice = styled.span`
  font-family: "Lato;
  font-size: 15px;
  font-weight: 700;
  color: #009e7f;
 
  margin-bottom: 10px;
`;

const TotalPrice = styled.span`
  font-family: "Lato;
  font-size: 15px;
  font-weight: 700;
  color: #0D1136;
  flex-shrink: 0;
  margin-left: auto;
`;

const PromoCode = styled.span`
  margin: 20px 0;
  display: flex;
  justify-content: center;

  > button {
    border: 0;
    outline: 0;
    box-shadow: none;
    background-color: transparent;
    display: inline-flex;
    cursor: pointer;
  font-family: "Lato;
  font-size: 15px;
  font-weight: 700;
  color: #009e7f;
    
    transition: color 0.35s ease;
    &:hover {
      color:#019376;
    }
  }
`;

const CouponBoxWrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  flex-direction: column;
  padding-right: 22px;
`;

const CouponCode = styled.p`
font-family: "Lato;
  font-size: 15px;
  font-weight: 700;
  color: #77798c;
 

  width: 100%;
  display: flex;
  justify-content: center;

  span {
    font-weight:700;
    color:#009e7f;
    margin-left: 5px;
  }
`;

const CheckoutButton = styled.button`
  height: 48px;
  width: calc(100% - 30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #009e7f;
  padding: 0;
  border-radius: 48px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border: 0;
  outline: 0;
  cursor: pointer;
  /* margin-top: auto; */
  margin-bottom: 15px;
  margin-left: 15px;

  @media (max-width: 767px) {
    height: 45px;
  }

  > a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
  }
`;

const Title = styled.a`
  font-family: "Lato";
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  padding-left: 5px;
  padding-right: 10px;
`;

const PriceBox = styled.span`
  width: auto;
  height: 44px;
  padding: 0 30px;
  overflow: hidden;
  border-radius: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  font-family: "Lato";
  font-size: 15px;
  font-weight: 700;
  color: #009e7f;
  margin-right: 2px;

  @media (max-width: 767px) {
    height: 41px;
  }
`;

export {
  ItemWrapper,
  CartPopupBody,
  ItemImgWrapper,
  ItemDetails,
  TotalPrice,
  ItemPrice,
  ItemTitle,
  CheckoutButtonWrapper,
  PromoCode,
  CouponBoxWrapper,
  CouponCode,
  CheckoutButton,
  Title,
  PriceBox,
};
