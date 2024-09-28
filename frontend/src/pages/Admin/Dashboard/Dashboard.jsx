import { FaUserShield, FaCartPlus } from "react-icons/fa";
import OrderTable from "../../../components/AdminComponents/OrdersTable/OrderTable";
import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import { useGetAdminsQuery } from "../../../Redux/user/userApi";
import { useGetFaqQuery } from "../../../Redux/faq/faq";
import { useGetAllFeatureQuery } from "../../../Redux/feature/featureApi";
import Spinner from "../../../components/Spinner/Spinner";
import { MdFeaturedPlayList } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

export default function Dashboard() {
  const { data: users, isLoading: userLoading } = useGetAdminsQuery();
  const { data: orders, isLoading: orderLoading } = useGetAllOrdersQuery();
  const { data: faqs, isLoading: faqLoading } = useGetFaqQuery();
  const { data: features, isLoading: featureLoading } = useGetAllFeatureQuery();

  if (userLoading || orderLoading || faqLoading || featureLoading) {
    return <Spinner />;
  }

  return (
    <section className="pb-5">
      <div className="container">
        <div className="grid sm:grid-cols-4 gap-1 sm:gap-4">
          <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
            <div>
              <p className="text-neutral font-dinMedium">Total Admin</p>
              <h3 className="text-primary font-bold">{users?.data?.length}</h3>
            </div>
            <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
              <FaUserShield className="text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
            <div>
              <p className="text-neutral font-dinMedium">Total Orders</p>
              <h3 className="text-primary font-bold">{orders?.data?.length}</h3>
            </div>
            <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
              <FaCartPlus className="text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
            <div>
              <p className="text-neutral font-dinMedium">Total Feature</p>
              <h3 className="text-primary font-bold">{features?.data?.length}</h3>
            </div>
            <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
              <MdFeaturedPlayList className="text-xl" />
            </div>
          </div>

          <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
            <div>
              <p className="text-neutral font-dinMedium">Total FAQ</p>
              <h3 className="text-primary font-bold">{faqs?.data?.length}</h3>
            </div>
            <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
              <FcAbout className="text-xl" />
            </div>
          </div>
        </div>

        {/* Orders */}
        <OrderTable />
      </div>
    </section>
  );
}
