import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ReactNode, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { BsViewList } from "react-icons/bs";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/icons8-mesh-50.png";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/LoginContext";
type MenuItem = {
  title: string;
  icon: ReactNode;
  path: string;
  private: boolean;
};
const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { isAuth, setIsAuth, userRole, setUserRole } = useAuth();

  const Menus: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      path: "/dashboard",
      private: true,
    },
    {
      title: "View all employees",
      icon: <HiUserGroup />,
      path: "/view-all-employees",
      private: true,
    },
    {
      title: "Create employee",
      icon: <TbUserEdit />,
      path: "/create-employee",
      private: true,
    },
    {
      title: "View all departments",
      icon: <BsViewList />,
      path: "/view-all-departments",
      private: true,
    },
    {
      title: "Create department",
      icon: <HiOutlineViewGridAdd />,
      path: "/create-department",
      private: true,
    },
    {
      title: "Settings",
      icon: <AiFillSetting />,
      path: "/settings",
      private: false,
    },
    { title: "Log Out", icon: <CgProfile />, path: "/logout", private: false },
  ];

  return (
    <div
      className={`bg-button h-screen p-5 pt-8  relative ${
        open ? "w-72" : "w-20"
      } duration-300`}
    >
      {!open ? (
        <AiOutlineMenu
          className="text-white text-3xl absolute -right-1 top-9  bg-herobt border-heroBg rounded cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        />
      ) : (
        <AiOutlineClose
          className="text-white text-3xl absolute -right-1 top-9  bg-herobt border-heroBg rounded cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        />
      )}

      <div className="inline-flex">
        {/* <HiUserGroup className="bg-herobt text-2xl max-w-md w-10 rounded cursor-pointer block float-left mr-2" /> */}

        <div className="flex justify-start items-center mx-0 py-8">
          <img src={logo} alt="logo" />{" "}
          <h1
            className={`text-3xl font-semibold text-heroBg ${
              !open && "hidden"
            }`}
          >
            HR<span className="text-sm italic text-herobt font-bold">Pro</span>
          </h1>
          <h3
            className={`text-white text-center text-sm mx-2 origin-left font-medium text-md duration-300 ${
              !open && "scale-0"
            }`}
          >
            HR Administration System
          </h3>
        </div>
      </div>
      <ul className="pt-2 ">
        {Menus.map((menu, index) => {
          // Check if the menu item should be displayed based on the user's role and the private flag
          const shouldDisplay =
            !menu.private || (menu.private && userRole === "admin");
          return shouldDisplay ? (
            <li
              key={index}
              className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-button2 rounded-md mt-2"
            >
              <span className="text-2xl block float-left">
                <span>{menu.icon}</span>
              </span>
              <span
                className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              >
                <Link to={menu.path}>{menu.title}</Link>
              </span>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default SideBar;
