import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/team`
const EditTeamMemberModal = ({ show, handleClose, teamMember }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [experience, setExperience] = useState('');
    const [bio, setBio] = useState('');
    const [degrees, setDegrees] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (teamMember) {
            setName(teamMember.name || '');
            setPosition(teamMember.position || '');
            setExperience(teamMember.experience || '');
            setBio(teamMember.bio || '');
            setDegrees(teamMember.degrees?.map(degree => 
                `${degree.title}, ${degree.institution}, ${degree.year || ''}`).join(' | ') || '');
        }
    }, [teamMember]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert degrees input to array of objects
        const degreeArray = degrees.split('|').map(degreeString => {
            const [title, institution, year] = degreeString.split(',').map(s => s.trim());
            return { 
                title, 
                institution, 
                year: year ? parseInt(year, 10) : null // Ensure year is a number or null
            };
        }).filter(degree => degree.year !== null); // Remove degrees with null year

        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('experience', experience);
        formData.append('bio', bio);
        formData.append('degrees', JSON.stringify(degreeArray));
        if (image) {
            formData.append('image', image);
        }

        try {
            if (teamMember) {
                await axios.put(`${apiUrl}/${teamMember._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await axios.post(`${apiUrl}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            handleClose();
        } catch (error) {
            console.error('Error saving team member:', error.response ? error.response.data : error.message);
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
                <h2 className="text-2xl font-semibold mb-4">
                    {teamMember ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
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

                    {/* Position */}
                    <div className="mb-4">
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                            id="position"
                            type="text"
                            placeholder="Enter position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Experience */}
                    <div className="mb-4">
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (years)</label>
                        <input
                            id="experience"
                            type="number"
                            placeholder="Enter experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            id="bio"
                            placeholder="Enter bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>

                    {/* Degrees */}
                    <div className="mb-4">
                        <label htmlFor="degrees" className="block text-sm font-medium text-gray-700">Degrees</label>
                        <input
                            id="degrees"
                            type="text"
                            placeholder="Enter degrees separated by | (title, institution, year)"
                            value={degrees}
                            onChange={(e) => setDegrees(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Profile Image */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            {teamMember ? 'Save Changes' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTeamMemberModal;
