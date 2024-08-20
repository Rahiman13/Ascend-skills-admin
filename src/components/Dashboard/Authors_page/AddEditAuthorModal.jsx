import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddEditAuthorModal = ({ author, onClose }) => {
    const [name, setName] = useState(author ? author.name : '');
    const [bio, setBio] = useState(author ? author.bio : '');
    const [experience, setExperience] = useState(author ? author.experience : '');
    const [previousCompany, setPreviousCompany] = useState(author ? author.previousCompany : '');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('experience', experience);
        formData.append('previousCompany', previousCompany);
        if (image) formData.append('image', image);

        try {
            if (author) {
                await axios.put(`https://ascend-skills-backend.onrender.com/api/authors/${author._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Success!', 'Author updated successfully.', 'success');
            } else {
                await axios.post('https://ascend-skills-backend.onrender.com/api/authors', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Success!', 'Author added successfully.', 'success');
            }
            onClose();
        } catch (error) {
            Swal.fire('Error!', error.response?.data?.message || 'There was an issue saving the author.', 'error');
        }
    };


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">
                    {author ? 'Edit Author' : 'Add Author'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Experience
                        </label>
                        <input
                            type="text"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Previous Company
                        </label>
                        <input
                            type="text"
                            value={previousCompany}
                            onChange={(e) => setPreviousCompany(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {author ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditAuthorModal;
