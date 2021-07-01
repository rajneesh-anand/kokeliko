import { Provider } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import AOS from "aos";
// CSS
import "aos/dist/aos.css";
import "suneditor/dist/css/suneditor.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/icofont.css";
import "../assets/css/animate.css";
import "../assets/css/elegantIcons.css";
import "lightgallery.js/dist/css/lightgallery.css";
//SCSS
import "../assets/scss/style.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      offset: 80,
      duration: 1000,
      once: true,
      easing: "ease",
    });
    AOS.refresh();

    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
