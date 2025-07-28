import { Link } from "react-router-dom";
import { useGetLogosQuery } from "../../Redux/logo/logoApi";

export default function Header() {
  const { data } = useGetLogosQuery();
  const logo = data?.data?.length > 0 ? data.data[0] : null;

  return (
    <header className="py-2 2xl:py-1 border-b border-primary bg-primary/10">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo?.logo}`}
              alt="logo"
              className="w-20 sm:w-24"
            />
          </Link>

          <a href="#order" className="primary_btn text-sm">
            অর্ডার করুন
          </a>
        </div>
      </div>
    </header>
  );
}
