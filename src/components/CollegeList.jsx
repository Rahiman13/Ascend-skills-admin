import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCollegeForm from './AddCollegeForm';
import UpdateCollegeForm from './UpdateCollegeForm';
import Modal from './Modal';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/colleges');
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleDelete = async (collegeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/colleges/${collegeId}`);
      setColleges(colleges.filter((college) => college._id !== collegeId));
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };

  const handleEdit = (college) => {
    setSelectedCollege(college);
    setIsModalOpen(true);
  };

  const handleCollegeUpdated = (updatedCollege) => {
    setColleges(colleges.map((college) => (college._id === updatedCollege._id ? updatedCollege : college)));
    setIsModalOpen(false);
  };

  const handleCollegeAdded = (newCollege) => {
    setColleges([...colleges, newCollege]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Colleges</h1>
        <AddCollegeForm onCollegeAdded={handleCollegeAdded} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {colleges.map((college) => (
            <div key={college._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={`http://localhost:5000/uploads/${college.logo}`} alt={college.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{college.name}</h2>
                <p className="text-gray-700 mb-2">Location: {college.location}</p>
                <p className="text-gray-700 mb-2">{college.description}</p>
                <button
                  onClick={() => handleEdit(college)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(college._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedCollege && (
            <UpdateCollegeForm
              college={selectedCollege}
              onCollegeUpdated={handleCollegeUpdated}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CollegeList;
