import styled from "styled-components";

export const ItemBox = styled.div({
  fontSize: "14px",
  // fontWeight: "bold",
  // borderBottom: `1px solid`,
  // borderBottomColor: "gray.200",
  display: "flex",
  justifyContent: "center",
});

export const Information = styled.div({
  display: "flex",
  flexDirection: "column",
  marginLeft: "4px",
  alignItems: "center",
});
export const Image = styled.img({
  width: 60,
  height: 60,
  objectFit: "cover",
  margin: "0 4px",
});
export const Name = styled.span({
  lineHeight: 1.5,
  fontSize: "16px",
});
export const Price = styled.span({
  color: "black",
});

export const Total = styled.span({
  color: "black",
});

export const RemoveButton = styled.button({
  padding: "5px",
  border: 0,
  outline: 0,
  marginLeft: "15px",
  cursor: "pointer",
  color: "rgba(0, 0, 0, 0.25)",
  transition: "all 0.4s ease",
  backgroundColor: "transparent",

  "&:hover": {
    color: "red",
  },
});
