import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../Redux/order/orderApi";
import Spinner from "../../Spinner/Spinner";
import { useGetLogosQuery } from "../../../Redux/logo/logoApi";
import { useGetBusinessQuery } from "../../../Redux/businessInfo/businessInfo";

export default function Order() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(id);

  const { data: logoInfo } = useGetLogosQuery();
  const logo = logoInfo?.data[0];

  const { data: contactInfo } = useGetBusinessQuery();
  const contact = contactInfo?.data[0];

  if (isLoading) return <Spinner />;

  const order = data?.data;
  const { createdAt, shipping, name, phone, city, address, products, total } =
    order;

  const date = createdAt.split("T")[0];
  const subTotal = products?.reduce(
    (acc, item) => acc + item?.product?.discountPrice * item?.quantity,
    0
  );

  return (
    <div>
      <div className="flex justify-between items-start border-b border-neutral-content pb-3">
        <div className="text-neutral-content text-sm">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo?.logo}`}
            alt="logo"
            className="w-36"
          />
          <p>{contact?.phone}</p>
          <p>{contact?.address}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-content">{date}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-[15px]">
          <h2>{name}</h2>
          <p>{phone}</p>
          <p>
            {address}, {city}
          </p>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product?._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/product/${
                        product?.product?.img
                      }`}
                      alt={product?.product?.title}
                      className="h-9 w-9 rounded-full"
                      loading="lazy"
                    />

                    <p>{product?.product?.title}</p>
                  </div>
                </td>
                <td>{product?.quantity}</td>
                <td>
                  <del className="text-red-500">{product?.product?.price}৳</del>
                </td>
                <td>{product?.product?.discountPrice}৳</td>
                <td>{product?.product?.discountPrice * product?.quantity}৳</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={5} className="text-end">
                SubTotal
              </th>
              <th>{subTotal}৳</th>
            </tr>

            <tr>
              <td colSpan={5} className="text-end">
                Shipping Charge
              </td>
              <td>{shipping}৳</td>
            </tr>

            <tr>
              <th colSpan={5} className="text-end">
                Total
              </th>
              <th>{total}৳</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-40">
        <p className="text-neutral-content text-xs text-center">
          Thank you for your order
        </p>
      </div>
    </div>
  );
}
