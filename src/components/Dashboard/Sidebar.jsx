import React from 'react';
import {
  FaHome,
  FaUsers,
  FaBookOpen,
  FaStar,
  FaUserFriends,
  FaVideo,
  FaGraduationCap,
  FaBuilding,
  FaPhone,
  FaUserCircle,
  FaBriefcase,
  FaLink,
  FaCalculator,
  FaClipboardList,
  FaMap
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Import the custom CSS for scrollbar

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    // { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    // { to: "/users", icon: <FaUsers />, label: "Users" },
    { to: "/courses", icon: <FaBookOpen />, label: "Courses" },
    { to: "/authors", icon: <FaUserCircle />, label: "Authors" },
    { to: "/colleges", icon: <FaBuilding />, label: "Colleges" },
    { to: "/phd-holders", icon: <FaGraduationCap />, label: "PhD Holders" },
    { to: "/teams", icon: <FaUserFriends />, label: "Team" },
    { to: "/companies", icon: <FaBuilding />, label: "Companies" },
    { to: "/placements", icon: <FaBriefcase />, label: "Placements" },
    { to: "/internships", icon: <FaClipboardList />, label: "Internships" },
    { to: "/roadmaps", icon: <FaMap />, label: "Roadmaps" },
    { to: "/contacts", icon: <FaPhone />, label: "Contacts" },
    { to: "/video-reviews", icon: <FaVideo />, label: "Video Reviews" },
    { to: "/reviews", icon: <FaStar />, label: "Reviews" },
    // { to: "/services", icon: <FaBriefcase />, label: "Services" },
    { to: "/address", icon: <FaBriefcase />, label: "Address" },
    { to: "/links", icon: <FaLink />, label: "Links" },
    { to: "/counters", icon: <FaCalculator />, label: "Counters" },

  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 flex flex-col shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wide">Ascend Skills</h1>
      </div>
      <nav className="flex-grow mt-5 overflow-y-auto custom-scrollbar">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.to}
              className={`px-4 py-3 hover:bg-gray-700 transition duration-300 ease-in-out ${
                location.pathname === item.to ? 'bg-gray-700' : ''
              }`}
            >
              <Link to={item.to} className="flex items-center">
                {item.icon && <span className="h-6 w-6 inline-block mr-3">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="px-4 py-3 border-t border-gray-700">
        <button className="w-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white py-2 rounded">
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
