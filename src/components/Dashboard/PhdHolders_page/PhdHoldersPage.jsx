import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddPhdHolderModal from './AddPhdHolderModal'; // Ensure you create this modal
import EditPhdHolderModal from './EditPhdHolderModal'; // Ensure you create this modal

const PhdHoldersPage = () => {
    const [phdHolders, setPhdHolders] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPhdHolder, setCurrentPhdHolder] = useState(null);

    useEffect(() => {
        fetchPhdHolders();
    }, []);

    const fetchPhdHolders = async () => {
        try {
            const response = await axios.get('https://ascend-skills-backend.onrender.com/api/phd-holders');
            setPhdHolders(response.data);
        } catch (error) {
            console.error('Error fetching PhD holders:', error);
            toast.error('Failed to fetch PhD holders');
        }
    };

    const handleAddPhdHolder = () => {
        setShowAddModal(true);
    };

    const handleEditPhdHolder = (phdHolder) => {
        setCurrentPhdHolder(phdHolder);
        setShowEditModal(true);
    };

    const handleDeletePhdHolder = async (id) => {
        try {
            await axios.delete(`https://ascend-skills-backend.onrender.com/api/phd-holders/${id}`);
            fetchPhdHolders();
            toast.success('PhD holder deleted successfully!');
        } catch (error) {
            console.error('Error deleting PhD holder:', error);
            toast.error('Failed to delete PhD holder');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Phd Holders</h1>
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleAddPhdHolder}
                >
                    Add PhD Holder
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {phdHolders.map((phdHolder) => (
                    <div key={phdHolder._id} className="bg-white p-4 rounded shadow-md">
                        {phdHolder.image && (
                            <img
                                src={`https://ascend-skills-backend.onrender.com/uploads/${phdHolder.image}`}
                                alt={phdHolder.name}
                                className="w-full h-40 object-cover rounded-md"
                            />
                        )}
                        <h2 className="text-xl font-semibold mt-4">{phdHolder.name}</h2>
                        <p className="text-gray-700 mt-2">{phdHolder.university}</p>
                        <p className="text-gray-600 mt-2">{phdHolder.fieldOfStudy}</p>
                        <p className="text-gray-600 mt-2">Year of Completion: {phdHolder.yearOfCompletion}</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleEditPhdHolder(phdHolder)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDeletePhdHolder(phdHolder._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && <AddPhdHolderModal show={showAddModal} handleClose={() => setShowAddModal(false)} onAdd={fetchPhdHolders} />}
            {showEditModal && <EditPhdHolderModal show={showEditModal} handleClose={() => setShowEditModal(false)} phdHolder={currentPhdHolder} onUpdate={fetchPhdHolders} />}
        </div>
    );
};

export default PhdHoldersPage;
