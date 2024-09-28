import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../Redux/order/orderApi";
import Spinner from "../../Spinner/Spinner";
import { useGetLogosQuery } from "../../../Redux/logo/logoApi";

export default function Order() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(id);

  const { data: logoInfo } = useGetLogosQuery();
  const logo = logoInfo?.data[0];

  if (isLoading) {
    return <Spinner />;
  }

  const order = data?.data;
  const { createdAt, quantity, shipping, name, phone, email, city, address } =
    order;

  const date = createdAt.split("T")[0];
  const price = order?.product?.price;

  return (
    <div>
      <div className="flex justify-between items-start border-b border-neutral-content pb-3">
        <div className="text-neutral-content text-sm">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo?.logo}`}
            alt=""
            className="w-36"
          />
          <p>01977-779279</p>
          <p>Zigatola, Dhaka, Bangladesh</p>
        </div>

        <div>
          <p className="text-sm text-neutral-content">{date}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-[15px]">
          <h2>{name}</h2>
          <p>{phone}</p>
          <p>{email}</p>
          <p>
            {address}, {city}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-neutral-content">
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <p className="text-[15px]">{order?.product?.title}</p>
          </div>

          <p>{quantity}</p>

          <p className="text-end">{quantity * price}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-neutral-content">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="sm:col-span-3"></div>

          <p>Total</p>

          <p className="text-end">{quantity * price}</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="sm:col-span-3"></div>

          <p>Shipping</p>

          <p className="text-end">{shipping}</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 font-medium text-lg">
          <div className="sm:col-span-3"></div>

          <p>SubTotal</p>

          <p className="text-end text-primary">{quantity * price + shipping}</p>
        </div>
      </div>
      <div className="mt-40">
        <p className="text-neutral-content text-xs text-center">
          Thank you for your order
        </p>
      </div>
    </div>
  );
}
