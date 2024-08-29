import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCompanyModal from './AddCompanyModal';
import EditCompanyModal from './EditCompanyModal';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/companies`
const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ascend-skills-backend.onrender.com/api/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Company List</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 object-cover rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
            <p className="text-gray-600 mb-2">{company.location}</p>
            <p className="text-gray-600 mb-2">{company.description}</p>
            <p className="text-gray-600 mb-2">Placed Students: {company.countOfPlacedStudents}</p>
            <p className="text-gray-600 mb-4">Industry: {company.industry}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(company)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(company._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddCompanyModal show={showAddModal} handleClose={() => setShowAddModal(false)} onSuccess={fetchCompanies} />
      {selectedCompany && (
        <EditCompanyModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          company={selectedCompany}
          onSuccess={fetchCompanies}
        />
      )}
    </div>
  );
};

export default CompanyPage;
