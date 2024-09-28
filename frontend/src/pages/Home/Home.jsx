import "./Home.css";
import Banner from "../../components/Banner/Banner";
import Services from "../../components/Services/Services";
import FAQ from "../../components/FAQ/FAQ";
import { useEffect } from "react";
import Order from "../../components/Order/Order";
import Products from "../../components/Products/Products";

export default function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Banner />
      <Services />
      <FAQ />
      <Products />
      <Order />
    </>
  );
}
