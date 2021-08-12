import { Provider } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "lib/ga";
import { CartProvider } from "contexts/cart/use-cart";
import AOS from "aos";
// CSS
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

//SCSS
import "assets/scss/styles.scss";

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
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Provider>
  );
};

export default App;
