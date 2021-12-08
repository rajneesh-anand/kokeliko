import { Spinner } from "react-bootstrap";
import styled from "styled-components";
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <CenterDiv>
      <Spinner animation="border" variant="primary" />
    </CenterDiv>
  );
};

export default Loading;
