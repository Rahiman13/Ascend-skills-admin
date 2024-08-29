import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base_Url from '../../../api';

const apiUrl=`${Base_Url}/links`
const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingLink, setEditingLink] = useState(null);
    const [formData, setFormData] = useState({
        playstore_link: '',
        classplus_link: '',
        mock_link: '',
        pricing_link: '',
        assessment_link: '',
        portal_link: ''
    });

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            // const response = await axios.get('http://localhost:5000/api/links');
            const response = await axios.get(`${apiUrl}`);
            setLinks(response.data);
        } catch (error) {
            console.error('Error fetching links', error);
        }
    };

    const handleShowModal = (link = null) => {
        setEditingLink(link);
        setFormData(link || {
            playstore_link: '',
            classplus_link: '',
            mock_link: '',
            pricing_link: '',
            assessment_link: '',
            portal_link: ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (editingLink) {
            // Edit existing link
            try {
                await axios.put(`${apiUrl}/${editingLink._id}`, formData);
            } catch (error) {
                console.error('Error updating link', error);
            }
        } else {
            // Create new link
            try {
                await axios.post(`${apiUrl}`, formData);
            } catch (error) {
                console.error('Error creating link', error);
            }
        }
        fetchLinks();
        handleCloseModal();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchLinks();
        } catch (error) {
            console.error('Error deleting link', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Links</h1>
                <button
                    className="bg-blue-500 text-white flex justify-end px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
                    onClick={() => handleShowModal()}
                >
                    Add New Link
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                    <div key={link._id} className="bg-white shadow-md rounded-md p-4">
                        <h3 className="text-lg font-semibold mb-2">{link.playstore_link}</h3>
                        <p className="text-sm text-gray-700 mb-2">Classplus: {link.classplus_link}</p>
                        <p className="text-sm text-gray-700 mb-2">Mock: {link.mock_link}</p>
                        <p className="text-sm text-gray-700 mb-2">Pricing: {link.pricing_link}</p>
                        <p className="text-sm text-gray-700 mb-2">Assessment: {link.assessment_link}</p>
                        <p className="text-sm text-gray-700 mb-2">Portal: {link.portal_link}</p>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600"
                            onClick={() => handleShowModal(link)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2 hover:bg-red-600"
                            onClick={() => handleDelete(link._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for Adding/Editing */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingLink ? 'Edit Link' : 'Add New Link'}
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Playstore Link</label>
                                <input
                                    type="text"
                                    name="playstore_link"
                                    value={formData.playstore_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Classplus Link</label>
                                <input
                                    type="text"
                                    name="classplus_link"
                                    value={formData.classplus_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Mock Link</label>
                                <input
                                    type="text"
                                    name="mock_link"
                                    value={formData.mock_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Pricing Link</label>
                                <input
                                    type="text"
                                    name="pricing_link"
                                    value={formData.pricing_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Assessment Link</label>
                                <input
                                    type="text"
                                    name="assessment_link"
                                    value={formData.assessment_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Portal Link</label>
                                <input
                                    type="text"
                                    name="portal_link"
                                    value={formData.portal_link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </form>
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleSubmit}
                            >
                                {editingLink ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinksPage;
