import React from "react";
import { Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import useAuthStore from "../../store/store";

const UserProfile = () => {
  const { user, setStore } = useAuthStore();
  const user1 = {
    name: "Shashwat Sagar",
    email: "shashwat@example.com",
    phone: "+91 9876543210",
    location: "Raipur, Chhattisgarh",
    avatar: "https://i.pravatar.cc/150?img=12",
    joined: "26 March, 2025",
  };

  return (
    <div className="p-1 md:p-3">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Cover Section */}
        <div className="h-40 bg-blue-600"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar + Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Avatar */}
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />

              {/* Name & Role */}
              <div className="mt-3 md:mt-0">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user?.username}
                </h1>

                {/* <p className="text-gray-500">{user.role}</p> */}
              </div>
            </div>

            {/* Edit Button */}
            <button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              <Edit size={18} />
              Edit Profile
            </button>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>

            {/* <p className="text-gray-600 leading-relaxed">{user.bio}</p> */}
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Phone className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{user?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <MapPin className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{user?.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Calendar className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-medium">{user?.joined}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="bg-blue-50 p-5 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-blue-600">24</h3>
              <p className="text-gray-600 mt-1">Projects</p>
            </div>

            <div className="bg-green-50 p-5 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-green-600">12</h3>
              <p className="text-gray-600 mt-1">Clients</p>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-purple-600">5+</h3>
              <p className="text-gray-600 mt-1">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
