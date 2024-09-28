import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../../Redux/user/userApi";
import Spinner from "../../../components/Spinner/Spinner";
import { useSelector } from "react-redux";

export default function Administrator() {
  const { loggedUser } = useSelector((state) => state.user);
  const { data, isLoading } = useGetAdminsQuery();

  const admins = data?.data;

  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDelete = async (id) => {
    if (loggedUser?.data?._id === id) {
      return Swal.fire("", "You can't delete yourself", "warning");
    }
    const isConfirm = window.confirm("are you sure delete this admin?");
    if (isConfirm) {
      const res = await deleteAdmin(id);
      if (res?.data?.success) {
        Swal.fire("", "Deleted success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">All Admin</h1>
          <Link to="/admin/administrator/add" className="primary_btn">
            Add Admin
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin, i) => (
              <tr key={admin?._id}>
                <td>{i + 1}</td>
                <td>{admin?.username}</td>
                <td>{admin?.name}</td>
                <td>{admin?.email}</td>
                <td>{admin?.phone}</td>
                <td>
                  <button onClick={() => handleDelete(admin?._id)}>
                    <AiOutlineDelete className="text-lg hover:text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
