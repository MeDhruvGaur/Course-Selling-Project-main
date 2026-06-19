import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Activity,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import useAppStore from "../store/appStore";

type NavItem = {
  title: string;
  link: string;
};

const navItems: NavItem[] = [
  { title: "Home Portal", link: "/" },
  { title: "Student Registration", link: "/registration" },
  { title: "Staff Directory", link: "/contact" },
  { title: "About ERP", link: "/about" },
];

const Footer = () => {
  const { name, age, gender } = useAppStore();
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden z-20">
      {/* Background Accent Gradients */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-rose-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">
        {/* Brand Section (Left) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Gender: {gender}</p>
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Student{" "}
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                ERP
              </span>
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
            A premium, high-performance web dashboard for unified campus
            governance, administrative automation, and real-time student
            self-service modules.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:support@erp.edu"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Portal Links (Middle Right) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
            ERP Workspaces
          </h4>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            <li>
              <Link
                to="/login/student"
                className="hover:text-rose-400 transition flex items-center gap-1.5"
              >
                Student Self Service{" "}
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </Link>
            </li>
            <li>
              <Link
                to="/login/faculty"
                className="hover:text-rose-400 transition flex items-center gap-1.5"
              >
                Faculty Portal Workspace{" "}
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </Link>
            </li>
            <li>
              <Link
                to="/registration"
                className="hover:text-rose-400 transition flex items-center gap-1.5"
              >
                New Registration Desk{" "}
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </Link>
            </li>
            <li>
              <Link
                to="/auth/dashboard"
                className="hover:text-rose-400 transition flex items-center gap-1.5"
              >
                Administrative Panel{" "}
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation links (Middle) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link to={item.link} className="hover:text-rose-400 transition">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Widget (Right) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
            Support
          </h4>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            <li className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="hover:text-rose-400 transition cursor-pointer">
                Help Center
              </span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="hover:text-rose-400 transition cursor-pointer">
                Terms of Use
              </span>
            </li>
            <li className="pt-2">
              {/* System operational status display */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-400 text-xs">
                <Activity className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>System Operational</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500 relative z-10">
        <p>
          © {new Date().getFullYear()} Student ERP System. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Designed & Engineered with{" "}
          <span className="text-rose-500 text-sm">♥</span> for Academic
          Excellence
        </p>
      </div>
    </footer>
  );
};

export default Footer;
