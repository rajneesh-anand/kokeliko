import Link from "next/link";
import FooterLogo from "../../components/footer-logo";

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="container-fluid">
        <div className="footer-content">
          <div className="widget-item-nav">
            <div className="widget-footer-nav">
              <nav>
                <ul>
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/terms"}>
                      <a target="_blank">Terms of Service</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/privacy"}>
                      <a target="_blank">Privacy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/contact"}>
                      <a>Contact Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={process.env.PUBLIC_URL + "/about"}>
                      <a>About KokeLiko</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="widget-item-social">
            <ul className="social">
              <li>
                <span>Follow Us </span>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="facebook"
                  target="_blank"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  className="twitter"
                  target="_blank"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  className="linkedin"
                  target="_blank"
                >
                  <i className="ri-twitter-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="instagram"
                  target="_blank"
                >
                  <i className="ri-instagram-line"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="widget-item">
                <ul className="widget-social">
                  <li className="social-text">
                    <span>follow us on social</span>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="social_twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="social_facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="social_instagram"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
        </div>
      </div>
      <div className="container-fluid">
        <div className="disclaimer">
          <span>Disclaimer :</span> The website is under construction. The data
          uploaded to website is purely for testing purposes. Kindly read the
          blog at relevant sources.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
