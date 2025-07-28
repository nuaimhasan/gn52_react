import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../Redux/order/orderApi";
import Swal from "sweetalert2";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";
import { useState } from "react";

export default function OrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  let query = {};
  query["limit"] = limit;
  query["page"] = currentPage;

  const { data, isLoading } = useGetAllOrdersQuery({ ...query });
  const [deleteOrder, { isLoading: deleteLoading }] = useDeleteOrderMutation();
  const { pathname } = useLocation();

  const orders = data?.data;

  const [updateOrderStatus, { isLoading: statusLoading }] =
    useUpdateOrderStatusMutation();

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-4 bg-base-100 p-4 rounded shadow">
      <div className="flex items-center justify-between">
        <p>Latest Orders</p>
        {pathname !== "/admin/orders" && (
          <Link to="/admin/orders" className="primary_btn text-sm">
            All Orders
          </Link>
        )}
      </div>

      <div className="mt-4 relative overflow-x-auto">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              orders?.map((order) => (
                <tr key={order?._id}>
                  <td>
                    <p>INV-{order?.invoiceNumber}</p>
                    <p>{order?.createdAt.split("T")[0]}</p>
                  </td>
                  <td>
                    <p>Name: {order?.name}</p>
                    <div className="text-sm text-neutral-content">
                      <p>Phone: {order?.phone}</p>
                      <p>city: {order?.city}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex -space-x-4 rtl:space-x-reverse">
                      {order?.products?.map((product) => (
                        <img
                          key={product?._id}
                          className="w-10 h-10 border border-white rounded-full dark:border-gray-800"
                          src={`${import.meta.env.VITE_BACKEND_URL}/product/${
                            product?.product?.img
                          }`}
                          alt="product"
                        />
                      ))}
                    </div>
                  </td>
                  <td>{order?.total}</td>
                  <td>
                    {statusLoading ? (
                      "Loading..."
                    ) : (
                      <select
                        value={order?.status}
                        onChange={async (e) => {
                          const res = await updateOrderStatus({
                            id: order?._id,
                            status: e.target.value,
                          });
                          if (res?.data?.success) {
                            Swal.fire("", "Status updated", "success");
                          } else {
                            Swal.fire("", "Something went wrong", "error");
                          }
                        }}
                        className={`border rounded p-1 text-xs cursor-pointer ${
                          order?.status == "pending" &&
                          "text-yellow-500 border-yellow-500"
                        } ${
                          order?.status == "shipped" &&
                          "text-blue-400 border-blue-400"
                        } ${
                          order?.status == "delivered" &&
                          "text-green-400 border-green-400"
                        } ${
                          order?.status == "cancelled" &&
                          "text-red-400 border-red-400"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/order/${order?._id}`}
                        className=" hover:text-blue-700"
                      >
                        <GrView />
                      </Link>
                      <button
                        disabled={deleteLoading && "disabled"}
                        className="hover:text-red-700"
                        onClick={async (e) => {
                          e.preventDefault();
                          const isConfirm = window.confirm(
                            "Are You Sure Delete this Order"
                          );
                          if (isConfirm) {
                            const res = await deleteOrder(order?._id);
                            if (res?.data?.success) {
                              Swal.fire("", "Delete success", "success");
                            } else {
                              Swal.fire("", "Something went wrong", "error");
                            }
                          }
                        }}
                      >
                        {deleteLoading ? "..." : <AiOutlineDelete />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
