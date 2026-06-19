import { Button } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdContact, IoMdPersonAdd } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAppStore from "../store/appStore";

type NavItem = {
  title: string;
  link: string;
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  { title: "Home", link: "/", icon: <AiOutlineHome /> },
  { title: "Registration", link: "/registration", icon: <IoMdPersonAdd /> },
  { title: "About", link: "/about", icon: <IoInformationCircleOutline /> },
  { title: "Contact", link: "/contact", icon: <IoMdContact /> },
];

const Header = () => {
  const navigate = useNavigate();
  const { name, age, gender } = useAppStore();
  return (
    <header>
      <div className="w-full shadow-md flex flex-row justify-between items-center p-6">
        <div className="text-3xl font-bold text-rose-500 bg-white">{name}</div>
        <div className=" flex flex-row items-center gap-4 font-semibold text-slate-800">
          {navItems.map((item: NavItem) => {
            return (
              <Link
                className="flex flex-row items-center justify-between gap-2 p-1 px-4 bg-slate-100 hover:bg-slate-400 rounded-lg"
                to={item.link}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}

          {/* 


        <Link className="flex flex-row items-center justify-between gap-2 p-1 px-4 bg-slate-100 hover:bg-slate-400 rounded-lg" to="/"> <AiOutlineHome />Home</Link>
        <Link className="flex flex-row items-center justify-between gap-2 p-1 px-4 bg-slate-100 hover:bg-slate-400 rounded-lg" to="/about"> <IoInformationCircleOutline />About</Link>
        <Link className="flex flex-row items-center justify-between gap-2 p-1 px-4 bg-slate-100 hover:bg-slate-400 rounded-lg" to="/contact"> <IoMdContact />Contact</Link>
        <Link className="flex flex-row items-center justify-between gap-2 p-1 px-4 bg-slate-100 hover:bg-slate-400 rounded-lg" to="/registration"> <IoMdPersonAdd />Registration</Link> */}
          <Button
            className="font-bold! tracking-wide uppercase bg-rose-500! text-white! rounded-lg!"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
