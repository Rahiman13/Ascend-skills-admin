import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditCollegeModal = ({ show, handleClose, college, onUpdate }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (college) {
            setName(college.name);
            setLocation(college.location);
            setDescription(college.description);
        }
    }, [college]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('description', description);
        if (logo) formData.append('logo', logo);

        try {
            await axios.put(`https://ascend-skills-backend.onrender.com/api/colleges/${college._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            handleClose();
            onUpdate();
            toast.success('College updated successfully!');
        } catch (error) {
            console.error('Error updating college:', error);
            toast.error('Failed to update college');
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit College</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Logo</label>
                        <input
                            type="file"
                            onChange={(e) => setLogo(e.target.files[0])}
                            className="w-full p-2 border rounded"
                            accept="image/jpeg, image/jpg, image/png"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Update College
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCollegeModal;
