import Swal from "sweetalert2";
import { useAddAdminMutation } from "../../../Redux/user/userApi";

export default function AddAdmin() {
  const [addAdmin, { isLoading, isError, error }] = useAddAdminMutation();

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const username = form.username.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;

    const adminInfo = {
      name,
      username,
      email,
      phone,
      password,
      role: "admin",
    };

    const res = await addAdmin(adminInfo);
    if (res?.data?.success) {
      Swal.fire("", "Admin add success", "success");
      form.reset();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form onSubmit={handleAddAdmin} className="w-[90%] sm:w-[350px]">
        <div>
          <h2 className="text-2xl font-medium text-center">Add Admin</h2>
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="eManager Ltd"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            Username
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="eManager"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="eManager@gmail.com"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium">
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="01xxxxxxxxx"
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            placeholder="********"
            required
          />
        </div>

        {isError && (
          <p className="text-red-500 text-xs">{error?.data?.message}</p>
        )}

        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading && "disabled"}
            className="text-base-100 bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
