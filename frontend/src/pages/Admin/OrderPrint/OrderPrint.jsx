import { useEffect } from "react";
import Order from "../../../components/AdminComponents/Order/Order";

export default function OrderPrint() {
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);

  return (
    <div className="md:w-[700px] h-screen mx-auto border p-6 text-neutral">
      <Order />
    </div>
  );
}
