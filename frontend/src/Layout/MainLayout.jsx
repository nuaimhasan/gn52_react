import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import { useGetSEOQuery } from "../Redux/seo/seoapi";
ReactGA.initialize("G-1313131313");

export default function MainLayout() {
  const location = useLocation();

  const { data: seo } = useGetSEOQuery();
  const seoData = seo?.data;

  ReactGA.send("pageview");

  useEffect(() => {
    if (!seoData?.custom?.google_tag_manager) return;
    const tagManagerArgs = {
      gtmId: seoData?.custom?.google_tag_manager,
    };
    TagManager.initialize(tagManagerArgs);
  }, [seoData]);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        page_path: location.pathname,
      },
    });
  }, [location]);

  return (
    <>
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
