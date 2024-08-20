import React from 'react';

const TopNavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          <button className="relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full h-10 w-10"
        />
      </div>
    </div>
  );
};

export default TopNavBar;
