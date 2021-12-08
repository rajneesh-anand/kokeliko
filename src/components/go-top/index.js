import React from "react";

const GoTop = ({ scrollStepInPx, delayInMs }) => {
  const [thePosition, setThePosition] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 170) {
      setThePosition(true);
    } else {
      setThePosition(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [thePosition]);

  const onScrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  };

  const scrollToTop = () => {
    timeoutRef.current = setInterval(onScrollStep, delayInMs);
  };

  const renderGoTopIcon = () => {
    return (
      <>
        <div
          className={`go-top ${thePosition ? "active" : ""}`}
          onClick={scrollToTop}
        >
          <i className="ri-arrow-up-s-line"></i>

          <style jsx>{`
            .go-top {
              bottom: 0;
              z-index: 4;
              opacity: 0;
              right: 20px;
              width: 45px;
              height: 45px;
              position: fixed;
              cursor: pointer;
              font-size: 27px;
              text-align: center;
              visibility: hidden;
              border-radius: 50%;
              color: var(--whiteColor);
              transition: var(--transition);
              background: var(--gradientColor);
              box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
            }
            .go-top i {
              left: 0;
              top: 50%;
              right: 0;
              position: absolute;
              text-align: center;
              transform: translateY(-50%);
              margin-left: auto;
              margin-right: auto;
            }
            .go-top.active {
              opacity: 1;
              bottom: 20px;
              visibility: visible;
            }
            .go-top:hover {
              transform: translateY(-5px);
            }

            // Responsive Style
            @media only screen and (max-width: 767px) {
              .go-top {
                right: 10px;
                width: 35px;
                height: 35px;
                font-size: 22px;
              }
              .go-top.active {
                bottom: 10px;
              }
            }
          `}</style>
        </div>
      </>
    );
  };

  return <>{renderGoTopIcon()}</>;
};

export default GoTop;
