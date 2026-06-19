import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut, BookOpen } from "lucide-react";
import { Badge, Button, Dropdown, Input, Avatar } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getCartApi } from "../services/api";
import useAuthStore from "../store/store";

const LmsNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, clearStore } = useAuthStore();

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await getCartApi();
      return data.data as Cart;
    },
    enabled: isAuthenticated,
  });

  const cartCount = cart?.courses?.length ?? 0;

  const handleLogout = () => {
    clearStore();
    navigate("/");
  };

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <div className="px-1 py-1">
          <p className="font-semibold text-slate-800 text-sm">
            {user?.fullName || user?.username}
          </p>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" as const },
    {
      key: "logout",
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-medium w-full"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      ),
    },
  ];

  return (
    <header className="bg-lms-blue-950 sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-lms-gold-500 to-yellow-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-lms-blue-950" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-extrabold text-lg tracking-tight">
                Learn
              </span>
              <span className="text-lms-gold-500 font-extrabold text-lg tracking-tight">
                Pro
              </span>
              <p className="text-[10px] text-slate-400 -mt-1 font-light tracking-wide">
                Learn Today, Lead Tomorrow
              </p>
            </div>
          </Link>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Home
            </Link>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Courses
            </Link>
          </nav>

          {/* Right: Search + Cart + User */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden lg:block">
              <Input
                placeholder="Search courses..."
                prefix={<Search className="w-4 h-4 text-slate-500" />}
                className="w-56 rounded-lg! bg-white/10! border-white/10! hover:border-lms-blue-600! text-white! placeholder-slate-500!"
                size="middle"
              />
            </div>

            {/* Cart */}
            <button
              onClick={() =>
                isAuthenticated ? navigate("/cart") : navigate("/login")
              }
              className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <Badge
                count={cartCount}
                size="small"
                offset={[-2, 2]}
                color="#ffc107"
                styles={{ indicator: { color: "#0a1128", fontWeight: 700 } }}
              >
                <ShoppingCart className="w-5 h-5 text-slate-300" />
              </Badge>
            </button>

            {/* User */}
            {isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                  <Avatar
                    size={32}
                    className="border-2 border-lms-gold-500/30 bg-lms-blue-800! font-bold text-lms-gold-500 flex items-center justify-center"
                  >
                    {user?.fullName?.charAt(0) || user?.username?.charAt(0) || "U"}
                  </Avatar>
                </button>
              </Dropdown>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="h-9! px-5! rounded-lg! font-semibold! text-sm! bg-lms-gold-500! hover:bg-lms-gold-400! text-lms-blue-950! border-none!"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LmsNavbar;
