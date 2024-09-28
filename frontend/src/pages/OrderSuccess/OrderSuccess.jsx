// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useGetOrderByIdQuery } from "../../Redux/order/orderApi";
// import { useEffect } from "react";
// import TagManager from "react-gtm-module";

// export default function OrderSuccess() {
//   const navigate = useNavigate();
//   const { orderId } = useParams();
//   const { data, isLoading } = useGetOrderByIdQuery(orderId);
//   const order = data?.data;

//   useEffect(() => {
//     if (order?._id) {
//       TagManager.dataLayer({
//         dataLayer: {
//           event: "purchase",
//           ecommerce: {
//             transaction_id: order?._id,
//             value: order?.product?.price,
//             currency: "BDT",
//             items: [
//               {
//                 item_id: order?.product?.id,
//                 item_name: order?.product?.title,
//                 price: order?.product?.price,
//                 quantity: order?.quantity,
//               },
//             ],
//             user_name: order?.name,
//             user_city: order?.city,
//             user_state: order?.address,
//             user_country: "Bangladesh",
//             user_phone_number: order?.phone,
//           },
//         },
//       });
//     } else if (!isLoading && !order?._id) {
//       setTimeout(() => {
//         navigate("/");
//       }, 3000);
//     }
//   }, [order, navigate, isLoading]);

//   return (
//     <div className="w-full h-screen flex justify-center items-center">
//       <div>
//         <img src="/success.png" alt="" className="w-40 mx-auto" />
//         <h1 className="mt-2 text-3xl text-center">Order Success</h1>
//         <p className="text-center">Your order has been placed successfully</p>
//         <div className="flex justify-center gap-3 mt-2">
//           <Link to="/" className="primary_btn text-sm">
//             Go Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../Redux/order/orderApi";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const order = data?.data;

  useEffect(() => {
    if (order?._id) {
      TagManager.dataLayer({
        dataLayer: {
          event: "purchase",
          purchase: {
            transaction_id: order?._id,
            value: order?.product?.price,
            currency: "BDT",
            item_id: order?.product?._id,
            item_name: order?.product?.title,
            price: order?.product?.price,
            quantity: order?.quantity,
            user_name: order?.name,
            user_city: order?.city,
            user_state: order?.address,
            user_country: "Bangladesh",
            user_phone_number: order?.phone,
          },
        },
      });
    }
  }, [order, navigate, isLoading]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <img src="/success.png" alt="" className="w-40 mx-auto" />
        <h1 className="mt-2 text-3xl text-center">Order Success</h1>
        <p className="text-center">Your order has been placed successfully</p>
        <div className="flex justify-center gap-3 mt-2">
          <Link to="/" className="primary_btn text-sm">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
