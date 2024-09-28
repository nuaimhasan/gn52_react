import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdminByIdQuery,
  useUpdateAdminByIdMutation,
} from "../../../redux/user/userApi";
import Swal from "sweetalert2";
import EditAdminPassword from "../../../components/DashboardComponents/EditAdminPassword/EditAdminPassword";

export default function EditAdministrator() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetAdminByIdQuery(id);
  const admin = data?.data;

  const [updateAdminById, { isLoading }] = useUpdateAdminByIdMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const info = {
      name,
      email,
      phone,
    };

    try {
      const res = await updateAdminById({ id, info }).unwrap();

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Administrator update success",
        });
        form.reset();
        navigate("/admin/administrator/all-administrator");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "",
        error?.data?.error ? error?.data?.error : "Something went wrong",
        "error"
      );
    }
  };

  return (
    <>
      <section className="bg-base-100 shadow rounded pb-4">
        <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
          <h3>Edit Admin</h3>
        </div>

        <div className="p-4 border md:w-2/3 mx-auto mt-4 rounded">
          <form
            onSubmit={handleEdit}
            className="form_group flex flex-col gap-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-content text-sm">Full Name</p>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={admin?.name}
                />
              </div>
              <div>
                <p className="text-neutral-content text-sm">Email</p>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={admin?.email}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-content text-sm">Phone</p>
                <input
                  type="text"
                  name="phone"
                  required
                  defaultValue={admin?.phone}
                />
              </div>
            </div>

            {/* {isError && (
            <p className="text-sm text-red-500">{error?.data?.message}</p>
          )} */}

            <div>
              <button
                disabled={isLoading && "disabled"}
                className="primary_light_btn my-4"
              >
                {isLoading ? "Loading..." : "Update Administrator"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <br />

      <EditAdminPassword id={id} admin={admin} />
    </>
  );
}
