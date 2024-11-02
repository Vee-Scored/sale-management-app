import React, { useEffect, useState } from "react";
import { UserCircle, Package, Ticket, LogOut, Menu, X } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "./components/Container";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "./Axios";
import pp from "./assets/profileImg.png";
import Swal from "sweetalert2";
import { useUserProfileStore } from "./store/useUserProfileStore";
import { useProductStore } from "./store/useProductStore";
import { usePaginationStore } from "./store/usePaginationStore";

const SidebarLink = ({ icon, text, active, onClick }) => (
  <li
    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
      active ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-blue-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </li>
);

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setProfile } = useUserProfileStore();
  const { setProduct } = useProductStore();
  const location = useLocation();
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const { profile } = useUserProfileStore();
  const {url,setMetaPathData,setPaginationLinks} = usePaginationStore();

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/user-profile/profile");
      if (res.status >= 200 && res.status < 300) {
        setProfile(res.data.data);
      } else if (res.status === 401) {
        toast.error("Session Expired!");
        alert("Session expired");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(error.message);
     localStorage.removeItem("token");
      nav("/");
    }
  };

  // const fetchProduct = async () => {
    
   
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.error("No auth token found");
  //     return;
  //   }
  
  //   try {
  //     const res = await fetch( url , {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     if (!res.ok) {
  //       console.error("HTTP error:", res.status);
  //       return;
  //     }
  
  //     const data = await res.json(); // Assuming response is JSON
  //     console.log(data);
  //     setProduct(data.data)
  //     setPaginationLinks(data.links)
  //     setMetaPathData(data.meta)
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };

  useEffect(() => {
    fetchProfile();
    //fetchProduct();

    if (!token) {
      nav("/");
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Sure to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        nav("/");
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const tabHandler = (route) => {
    nav(route);
    setIsSidebarOpen(false); // Collapse sidebar on tab click
  };

  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r shadow-lg sm:shadow-none`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <SidebarLink
              icon={<UserCircle size={20} />}
              text="Profile"
              active={location.pathname === "/dashboard"}
              onClick={() => tabHandler("/dashboard")}
            />
            <SidebarLink
              icon={<Ticket size={20} />}
              text="Open Voucher"
              active={location.pathname === "/dashboard/voucher/open-voucher"}
              onClick={() => tabHandler("/dashboard/voucher/open-voucher")}
            />
            <SidebarLink
              icon={<Ticket size={20} />}
              text="Vouchers"
              active={location.pathname === "/dashboard/voucher/list"}
              onClick={() => tabHandler("/dashboard/voucher/list")}
            />
            <SidebarLink
              icon={<Package size={20} />}
              text="Products"
              active={
                location.pathname === "/dashboard/product/list" || 
                location.pathname === "/dashboard/product/create" ||
                location.pathname.includes("/dashboard/product/edit")
              }
              onClick={() => tabHandler("/dashboard/product/list")}
            />
            <button className="w-full" onClick={handleLogout}>
              <SidebarLink icon={<LogOut size={20} />} text="Logout" />
            </button>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b shadow-sm">
          <Container>
            <div className="flex items-center justify-between py-4">
              <button onClick={toggleSidebar} className="md:hidden">
                <Menu size={24} />
              </button>
              <div className="ml-auto flex gap-2 items-center ">
                <h1 className="text-xl font-semibold text-gray-800">
                  {profile.name}
                </h1>
                <img
                  className="size-9 rounded-full object-cover"
                  src={profile.profile_image ? profile.profile_image : pp}
                  alt=""
                />
              </div>
            </div>
          </Container>
        </header>
        <main className="flex-1 no-scrollbar overflow-x-hidden bg-white overflow-y-auto">
          <Toaster />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
