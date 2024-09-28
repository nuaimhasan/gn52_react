import { Link, useParams } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import Order from "../../../components/AdminComponents/Order/Order";

export default function OrderDetails() {
  const { id } = useParams();
  return (
    <section className="py-5">
      <div className="container">
        <div className="md:w-[700px] mx-auto border p-6 text-neutral">
          <div className="flex justify-end">
            <Link to={`/admin/order/print/${id}`} target="_blank">
              <FaPrint />
            </Link>
          </div>
          <br />

          <Order />
        </div>
      </div>
    </section>
  );
}
