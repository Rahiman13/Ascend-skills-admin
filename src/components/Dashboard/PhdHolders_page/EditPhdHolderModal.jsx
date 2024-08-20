import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPhdHolderModal = ({ show, handleClose, phdHolder, onUpdate }) => {
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [yearOfCompletion, setYearOfCompletion] = useState('');
    const [publications, setPublications] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (phdHolder) {
            setName(phdHolder.name || '');
            setUniversity(phdHolder.university || '');
            setFieldOfStudy(phdHolder.fieldOfStudy || '');
            setYearOfCompletion(phdHolder.yearOfCompletion || '');
            setPublications(phdHolder.publications?.join(', ') || '');
        }
    }, [phdHolder]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        if (!name || !university || !fieldOfStudy || !yearOfCompletion || !publications) {
            console.error('All fields are required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('university', university);
        formData.append('fieldOfStudy', fieldOfStudy);
        formData.append('yearOfCompletion', yearOfCompletion);
        formData.append('publications', publications);
        if (image) {
            formData.append('image', image);
        }
    
        try {
            console.log('Submitting data:', {
                name,
                university,
                fieldOfStudy,
                yearOfCompletion,
                publications,
                image: image ? image.name : 'No image',
            });
            const response = await axios.put(`https://ascend-skills-backend.onrender.com/api/phd-holders/${phdHolder._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            handleClose();
            onUpdate();
        } catch (error) {
            console.error('Error updating PhD holder:', error.response?.data || error.message);
        }
    };
    
    

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${show ? 'block' : 'hidden'}`}
            onClick={handleClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold mb-4">Edit PhD Holder</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
                        <input
                            id="university"
                            type="text"
                            placeholder="Enter university"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">Field of Study</label>
                        <input
                            id="fieldOfStudy"
                            type="text"
                            placeholder="Enter field of study"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="yearOfCompletion" className="block text-sm font-medium text-gray-700">Year of Completion</label>
                        <input
                            id="yearOfCompletion"
                            type="number"
                            placeholder="Enter year of completion"
                            value={yearOfCompletion}
                            onChange={(e) => setYearOfCompletion(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="publications" className="block text-sm font-medium text-gray-700">Publications</label>
                        <input
                            id="publications"
                            type="text"
                            placeholder="Enter publications (comma separated)"
                            value={publications}
                            onChange={(e) => setPublications(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-1 block w-full text-gray-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Update PhD Holder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPhdHolderModal;
