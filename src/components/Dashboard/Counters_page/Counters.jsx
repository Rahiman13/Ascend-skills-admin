import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base_Url from '../../../api';

const apiUrl=`${Base_Url}/counters`

const CountersPage = () => {
    const [counters, setCounters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCounter, setEditingCounter] = useState(null);
    const [formData, setFormData] = useState({
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
    });

    useEffect(() => {
        fetchCounters();
    }, []);

    const fetchCounters = async () => {
        try {
            const response = await axios.get(`${apiUrl}`);
            setCounters(response.data.data || []); // Adjust based on actual response structure
        } catch (error) {
            console.error('Error fetching counters', error);
        }
    };

    const handleShowModal = (counter = null) => {
        setEditingCounter(counter);
        setFormData(counter || {
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (editingCounter) {
                // Edit existing counter
                await axios.put(`${apiUrl}/${editingCounter._id}`, formData);
            } else {
                // Create new counter
                await axios.post(`${apiUrl}`, formData);
            }
            fetchCounters();
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting counter', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchCounters();
        } catch (error) {
            console.error('Error deleting counter', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Counters</h1>
                <button
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleShowModal()}>
                    Add New Counter
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {counters.map((counter) => (
                    <div key={counter._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Counter {counter._id}</h3>
                        <p>Count 1: {counter.count1}</p>
                        <p>Count 2: {counter.count2}</p>
                        <p>Count 3: {counter.count3}</p>
                        <p>Count 4: {counter.count4}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleShowModal(counter)}>
                                Edit
                            </button>
                            <button
                                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDelete(counter._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Adding/Editing */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-semibold mb-4">
                            {editingCounter ? 'Edit Counter' : 'Add New Counter'}
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count1">
                                    Count 1
                                </label>
                                <input
                                    type="number"
                                    name="count1"
                                    value={formData.count1}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count2">
                                    Count 2
                                </label>
                                <input
                                    type="number"
                                    name="count2"
                                    value={formData.count2}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count3">
                                    Count 3
                                </label>
                                <input
                                    type="number"
                                    name="count3"
                                    value={formData.count3}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count4">
                                    Count 4
                                </label>
                                <input
                                    type="number"
                                    name="count4"
                                    value={formData.count4}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleCloseModal}>
                                Close
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmit}>
                                {editingCounter ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountersPage;
