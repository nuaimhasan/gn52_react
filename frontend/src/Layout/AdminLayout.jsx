import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "/src/assets/css/Admin.css";
import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminComponents/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminComponents/AdminSidebar/AdminSidebar";

export default function AdminLayout() {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname == "/admin") {
      navigate("/admin/dashboard");
    }
  }, [pathname, navigate]);

  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".admin_sidebar") &&
          !e.target.closest(".admin_sidebar_btn")) ||
        e.target.closest(".admin_siderbar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);



  return (
    <section className="flex">
      <aside className={`admin_sidebar ${sidebar && "admin_sidebar_show"}`}>
        <AdminSidebar />
      </aside>
      <div className="admin_content">
        <AdminHeader setSidebar={setSidebar} />
        <main className="sm:p-3 py-3">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
