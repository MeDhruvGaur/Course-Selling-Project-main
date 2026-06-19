// import React from "react";
// import {
//   Users,
//   DollarSign,
//   ShoppingCart,
//   Activity,
//   ArrowUpRight,
// } from "lucide-react";

// const Dashboard = () => {
//   const stats = [
//     {
//       title: "Total Users",
//       value: "12,450",
//       growth: "+12%",
//       icon: <Users size={28} />,
//     },
//     {
//       title: "Revenue",
//       value: "$48,900",
//       growth: "+18%",
//       icon: <DollarSign size={28} />,
//     },
//     {
//       title: "Orders",
//       value: "1,240",
//       growth: "+8%",
//       icon: <ShoppingCart size={28} />,
//     },
//     {
//       title: "Active Sessions",
//       value: "320",
//       growth: "+5%",
//       icon: <Activity size={28} />,
//     },
//   ];

//   const recentActivities = [
//     "New user registered",
//     "Order #1024 completed",
//     "Payment received from client",
//     "Server updated successfully",
//     "New product added",
//   ];

//   return (
//     <div className="p-1 md:p-3">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Dashboard
//             </h1>

//             <p className="text-gray-500 mt-1">
//               Welcome back 👋
//             </p>
//           </div>

//           <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
//             Generate Report
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {stats.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-5"
//             >
//               <div className="flex items-center justify-between">
                
//                 <div>
//                   <p className="text-gray-500 text-sm">
//                     {item.title}
//                   </p>

//                   <h2 className="text-3xl font-bold text-gray-800 mt-2">
//                     {item.value}
//                   </h2>
//                 </div>

//                 <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
//                   {item.icon}
//                 </div>
//               </div>

//               <div className="flex items-center gap-1 mt-4 text-green-600 text-sm font-medium">
//                 <ArrowUpRight size={16} />
//                 {item.growth} this month
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Content Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
          
//           {/* Chart Placeholder */}
//           <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Analytics Overview
//               </h2>

//               <select className="border rounded-lg px-3 py-2 text-sm outline-none">
//                 <option>Last 7 Days</option>
//                 <option>Last 30 Days</option>
//                 <option>Last Year</option>
//               </select>
//             </div>

//             {/* Fake Chart */}
//             <div className="h-80 flex items-end gap-3">
//               {[40, 70, 55, 90, 65, 80, 50].map((height, index) => (
//                 <div
//                   key={index}
//                   className="flex-1 bg-blue-500 rounded-t-xl"
//                   style={{ height: `${height}%` }}
//                 ></div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activities */}
//           <div className="bg-white rounded-2xl shadow-md p-5">
//             <h2 className="text-xl font-semibold text-gray-800 mb-5">
//               Recent Activities
//             </h2>

//             <div className="space-y-4">
//               {recentActivities.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-3"
//                 >
//                   <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

//                   <div>
//                     <p className="text-gray-700">
//                       {activity}
//                     </p>

//                     <span className="text-sm text-gray-400">
//                       2 mins ago
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white rounded-2xl shadow-md p-5 mt-6 overflow-x-auto">
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Recent Orders
//             </h2>

//             <button className="text-blue-600 hover:underline">
//               View All
//             </button>
//           </div>

//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b">
//                 <th className="py-3">Order ID</th>
//                 <th className="py-3">Customer</th>
//                 <th className="py-3">Status</th>
//                 <th className="py-3">Amount</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr className="border-b hover:bg-gray-50">
//                 <td className="py-4">#1024</td>
//                 <td>John Doe</td>
//                 <td>
//                   <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
//                     Completed
//                   </span>
//                 </td>
//                 <td>$250</td>
//               </tr>

//               <tr className="border-b hover:bg-gray-50">
//                 <td className="py-4">#1025</td>
//                 <td>Sarah Smith</td>
//                 <td>
//                   <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
//                     Pending
//                   </span>
//                 </td>
//                 <td>$180</td>
//               </tr>

//               <tr className="hover:bg-gray-50">
//                 <td className="py-4">#1026</td>
//                 <td>Michael Lee</td>
//                 <td>
//                   <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
//                     Cancelled
//                   </span>
//                 </td>
//                 <td>$320</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;