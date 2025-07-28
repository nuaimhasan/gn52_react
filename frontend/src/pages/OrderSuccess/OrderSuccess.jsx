import { Link, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../Redux/order/orderApi";
import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import TagManager from "react-gtm-module";
import moment from "moment";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const order = data?.data;
  const products = order?.products;

  const subTotal = products?.reduce(
    (acc, item) => acc + item?.product?.discountPrice * item?.quantity,
    0
  );

  useEffect(() => {
    if (order?._id && !isLoading) {
      TagManager.dataLayer({
        dataLayer: {
          event: "purchase",
          purchase: {
            customer: {
              name: order?.name,
              phone: order?.phone,
            },
            ecommerce: {
              currency: "BDT",
              value: order?.total,
              shipping: order?.shipping,
              transaction_id: orderId,

              items: [
                products?.map((product) => ({
                  item_id: product?.product?._id,
                  item_name: product?.product?.title,
                  price: product?.product?.price,
                  discountPrice: product?.product?.discountPrice,
                  quantity: product?.quantity,
                })),
              ],
            },
          },
        },
      });
    }
  }, [order, isLoading, orderId, products]);

  return (
    <section className="flex justify-center items-center min-h-[80vh] py-5">
      <div className="w-[95%] sm:w-[600px] flex flex-col gap-2 justify-center items-center">
        <div className="text-center">
          <p className="flex justify-center items-center mb-2">
            <AiFillCheckCircle className="text-6xl text-primary" />
          </p>
          <h2 className="text-primary text-2xl font-semibold">
            Thank you. Your order has been received.
          </h2>
        </div>

        <div className="mt-4 w-full bg-gray-100 text-neutral grid grid-cols-3 text-sm">
          <div className="border-r p-3">
            <h3 className="font-medium mb-1">Order Number</h3>
            <p>INV-{order?.invoiceNumber}</p>
          </div>
          <div className="border-r p-3">
            <h3 className="font-medium mb-1">Date</h3>
            <p>{moment(order?.createdAt).format("DD MMM YYYY")}</p>
          </div>
          <div className="p-3">
            <h3 className="font-medium mb-1">Payment</h3>
            <p>{order?.total} BDT</p>
          </div>
        </div>

        <div className="mt-1 w-full bg-gray-100 text-neutral p-3 text-sm">
          <h3 className="font-medium  text-base">Order Details</h3>

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
                      <del className="text-red-500">
                        {product?.product?.price}৳
                      </del>
                    </td>
                    <td>{product?.product?.discountPrice}৳</td>
                    <td>
                      {product?.product?.discountPrice * product?.quantity}৳
                    </td>
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
                  <td>{order?.shipping}৳</td>
                </tr>

                <tr>
                  <th colSpan={5} className="text-end">
                    Total
                  </th>
                  <th>{order?.total}৳</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-1 w-full bg-gray-100 text-neutral p-3 text-sm">
          <h3 className="font-medium text-base">Billing Address</h3>

          <div className="mt-3">
            <p>Name: {order?.name}</p>
            <p>Phone: {order?.phone}</p>
            <p>City: {order?.city}</p>
            <p>Address: {order?.address}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 text-[13px] mt-2">
          <Link to="/" className="primary_btn">
            Go To Home
          </Link>
        </div>
      </div>
    </section>
  );
}
