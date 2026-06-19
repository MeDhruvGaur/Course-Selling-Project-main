// import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
// const { Sider, Header, Content } = Layout;
// import { useState } from "react";
// import {
//   AppstoreOutlined,
//   UserOutlined,
//   HomeOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from "@ant-design/icons";
// import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import { GraduationCap } from "lucide-react";
// import useAuthStore from "../store/store";

// const AuthLayout = () => {
//   const { user, clearStore } = useAuthStore();
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const items = [
//     {
//       key: "1",
//       label: <Link to="/auth/profile">Profile</Link>,
//     },
//     {
//       key: "2",
//       label: (
//         <Button variant="solid" color="red" block onClick={() => clearStore()}>
//           Logout
//         </Button>
//       ),
//     },
//   ];

//   // Highlight menu key based on current pathname
//   const getSelectedKey = () => {
//     if (location.pathname.includes("dashboard")) return "1";
//     if (location.pathname.includes("student-registration")) return "2";
//     return "1";
//   };

//   const menuItems = [
//     {
//       key: "1",
//       icon: <AppstoreOutlined className="text-lg" />,
//       label: <Link to="/auth/dashboard">Dashboard</Link>,
//     },
//     {
//       key: "2",
//       icon: <HomeOutlined className="text-lg" />,
//       label: <Link to="/auth/student-registration">Student Registration</Link>,
//     },
//     {
//       key: "3",
//       icon: <HomeOutlined className="text-lg" />,
//       label: <Link to="/">Public Portal</Link>,
//     },
//   ];

//   return (
//     <Layout className="h-screen w-screen overflow-hidden flex flex-row bg-slate-50 font-sans">
//       {/* Sider (collapsible) */}
//       <Sider
//         width={256}
//         collapsedWidth={80}
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         className="h-screen border-r border-slate-800 shadow-xl"
//         theme="dark"
//       >
//         {/* Brand Header */}
//         <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800 overflow-hidden bg-slate-950/40">
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md">
//             <GraduationCap className="w-5 h-5 text-white" />
//           </div>
//           {!collapsed && (
//             <span className="text-white font-extrabold text-lg tracking-tight select-none animate-fade-in">
//               Student{" "}
//               <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
//                 ERP
//               </span>
//             </span>
//           )}
//         </div>

//         {/* Sidebar Menu */}
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[getSelectedKey()]}
//           items={menuItems}
//           className="pt-4 border-none"
//         />
//       </Sider>

//       {/* Main Right Area */}
//       <Layout className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-50">
//         {/* Header - Height 16 (64px) with modern white border layout */}
//         <Header className="h-16! leading-16! bg-white! border-b! border-slate-200/80! px-6! flex! flex-row! items-center! justify-between! shadow-sm! relative! z-10!">
//           {/* Header Left (Collapse Toggle Trigger) */}
//           <div className="flex items-center gap-4">
//             <Button
//               type="text"
//               icon={
//                 collapsed ? (
//                   <MenuUnfoldOutlined className="text-lg" />
//                 ) : (
//                   <MenuFoldOutlined className="text-lg" />
//                 )
//               }
//               onClick={() => setCollapsed(!collapsed)}
//               className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
//             />
//             <h2 className="hidden sm:block text-slate-800 font-bold text-lg tracking-wide">
//               Academic Control Hub
//             </h2>
//           </div>

//           {/* Header Right (User Profile Section) */}
//           <Dropdown menu={{ items: items }}>
//             <div
//               onClick={() => navigate("/auth/profile")}
//               className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 cursor-pointer select-none"
//             >
//               <div className="text-right hidden md:block">
//                 <p className="text-sm font-semibold text-slate-800 leading-none">
//                   {user?.username}
//                 </p>
//                 <p className="text-[11px] text-slate-400 leading-none mt-1 font-medium">
//                   {user?.email || "email"}
//                 </p>
//               </div>

//               <Avatar
//                 size={38}
//                 src={user?.avatar}
//                 icon={<UserOutlined />}
//                 className="border-2 border-rose-500/20 bg-rose-50!"
//               />
//             </div>
//           </Dropdown>
//         </Header>

//         {/* Scrollable Content Viewport */}
//         <Content className="flex-1 h-[calc(100vh-64px)] overflow-y-auto bg-slate-50/50 relative">
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AuthLayout;
