import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthorModal = ({ author, onClose, fetchAuthors }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [experience, setExperience] = useState('');
    const [previousCompany, setPreviousCompany] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (author) {
            setName(author.name);
            setBio(author.bio);
            setExperience(author.experience);
            setPreviousCompany(author.previousCompany);
        }
    }, [author]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('experience', experience);
        formData.append('previousCompany', previousCompany);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (author) {
                await axios.put(`https://ascend-skills-backend.onrender.com/api/authors/${author._id}`, formData);
                Swal.fire('Updated!', 'Author has been updated.', 'success');
            } else {
                await axios.post('https://ascend-skills-backend.onrender.com/api/authors', formData);
                Swal.fire('Created!', 'Author has been added.', 'success');
            }
            fetchAuthors();
            onClose();
        } catch (error) {
            console.error('Error saving author:', error);
            Swal.fire('Error!', 'Failed to save author.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{author ? 'Edit Author' : 'Add Author'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Experience</label>
                        <input
                            type="number"
                            id="experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="previousCompany">Previous Company</label>
                        <input
                            type="text"
                            id="previousCompany"
                            value={previousCompany}
                            onChange={(e) => setPreviousCompany(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {author ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthorModal;
