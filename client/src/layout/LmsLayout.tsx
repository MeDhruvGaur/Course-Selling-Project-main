import { Outlet } from "react-router-dom";
import { LmsNavbar, LmsFooter } from "../components";

const LmsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <LmsNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <LmsFooter />
    </div>
  );
};

export default LmsLayout;
