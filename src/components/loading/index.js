import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
