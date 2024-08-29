import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCollegeModal from './AddCollegeModal';
import EditCollegeModal from './EditCollegeModal';
import Base_Url from '../../../api';


const apiUrl = `${Base_Url}/colleges`
const CollegesPage = () => {
    const [colleges, setColleges] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentCollege, setCurrentCollege] = useState(null);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            const response = await axios.get(`${apiUrl}`);
            setColleges(response.data);
        } catch (error) {
            console.error('Error fetching colleges:', error);
            toast.error('Failed to fetch colleges');
        }
    };

    const handleAddCollege = () => {
        setShowAddModal(true);
    };

    const handleEditCollege = (college) => {
        setCurrentCollege(college);
        setShowEditModal(true);
    };

    const handleDeleteCollege = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchColleges();
            toast.success('College deleted successfully!');
        } catch (error) {
            console.error('Error deleting college:', error);
            toast.error('Failed to delete college');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Colleges</h1>

                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleAddCollege}
                >
                    Add College
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {colleges.map((college) => (
                    <div key={college._id} className="bg-white p-4 rounded shadow-md">
                        <img
                            // src={`https://ascend-skills-backend.onrender.com/uploads/${college.logo}`}
                            src={college.logo}
                            alt={college.name}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h2 className="text-xl font-semibold mt-4">{college.name}</h2>
                        <p className="text-gray-700 mt-2">{college.location}</p>
                        <p className="text-gray-600 mt-2">{college.description}</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEditCollege(college)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDeleteCollege(college._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && <AddCollegeModal show={showAddModal} handleClose={() => setShowAddModal(false)} onAdd={fetchColleges} />}
            {showEditModal && <EditCollegeModal show={showEditModal} handleClose={() => setShowEditModal(false)} college={currentCollege} onUpdate={fetchColleges} />}
        </div>
    );
};

export default CollegesPage;
