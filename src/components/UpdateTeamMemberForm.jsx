import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTeamMemberForm = ({ teamMember, onTeamMemberUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    experience: '',
    bio: '',
    degrees: '',
    image: null,
  });

  useEffect(() => {
    setFormData({
      name: teamMember.name,
      position: teamMember.position,
      experience: teamMember.experience,
      bio: teamMember.bio,
      degrees: JSON.stringify(teamMember.degrees),
      image: null,
    });
  }, [teamMember]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/team/${teamMember._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onTeamMemberUpdated(response.data);
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="number"
        name="experience"
        placeholder="Experience (years)"
        value={formData.experience}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="degrees"
        placeholder="Degrees (JSON format)"
        value={formData.degrees}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
        Update Team Member
      </button>
    </form>
  );
};

export default UpdateTeamMemberForm;
