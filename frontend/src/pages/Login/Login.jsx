import { useEffect, useState } from "react";
import { useLoginMutation } from "../../Redux/user/userApi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { loggedUser } = useSelector((store) => store.user);
  const [error, setError] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (loggedUser?.success && !isError) {
      navigate(from, { replace: true });
    }
  }, [loggedUser, isError, from, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    const loginInfo = {
      username,
      password,
    };

    const res = await login(loginInfo);
    if (res?.data?.success) {
      toast.success("Login Successful");
    } else {
      setError(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form onSubmit={handleLogin} className="w-[90%] sm:w-[350px]">
        <div>
          <h2 className="text-2xl font-medium text-center">Admin Login</h2>
        </div>
        <br />
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

        {error && <p className="text-red-500 text-xs">{error}</p>}
        <br />
        <button
          type="submit"
          disabled={isLoading && "disabled"}
          className="text-base-100 bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
