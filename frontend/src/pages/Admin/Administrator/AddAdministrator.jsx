import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddAdminMutation } from "../../../Redux/user/userApi";

export default function AddAdministrator() {
  const navigate = useNavigate();
  const [addAdministrator, { isLoading, isError, error }] =
  useAddAdminMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const username = form.username.value.toLowerCase();
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;

    const info = {
      name,
      username,
      email,
      phone,
      password,
    };

    const res = await addAdministrator(info);

    if (res?.data?.success) {
      Swal.fire("", "Administrator add success", "success");
      form.reset();
      navigate("/admin/administrator/all");
    } else {
      Swal.fire("", "Something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded pb-4">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Admin</h3>
      </div>

      <div className="p-4 border md:w-2/3 mx-auto mt-4 rounded">
        <form onSubmit={handleAdd} className="form_group flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">User Name *</p>
              <input
                type="text"
                name="username"
                required
                className="lowercase"
              />
            </div>

            <div>
              <p className="text-neutral-content text-sm">Password *</p>
              <input type="password" name="password" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Full Name</p>
              <input type="text" name="name" required />
            </div>

            <div>
              <p className="text-neutral-content text-sm">Email</p>
              <input type="email" name="email" required />
            </div>

            <div>
              <p className="text-neutral-content text-sm">Phone</p>
              <input type="text" name="phone" required />
            </div>
          </div>

          {isError && (
            <p className="text-sm text-red-500">{error?.data?.message}</p>
          )}

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn text-sm"
            >
              {isLoading ? "Loading..." : "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
