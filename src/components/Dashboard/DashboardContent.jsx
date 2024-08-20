import React from 'react';

const DashboardContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Total Users</h3>
        <p className="mt-2 text-3xl">1,234</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Total Courses</h3>
        <p className="mt-2 text-3xl">567</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Total Revenue</h3>
        <p className="mt-2 text-3xl">$12,345</p>
      </div>
    </div>
  );
};

export default DashboardContent;
